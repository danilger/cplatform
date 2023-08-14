import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.model';
import { LoginUserDto } from './dto/login.user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((r) => r.role),
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    const passCheck = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (user && passCheck) {
      return user;
    }
    throw new HttpException(
      'Не корректный пароль или email',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(loginUserDto: LoginUserDto, response: any) {
    const user = await this.validateUser(loginUserDto);
    const userFromDB = await this.userService.getUserById(`${user.id}`);
    const dataToken = await this.generateToken(userFromDB);

    response.cookie('access_token', dataToken.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    response.cookie('user_logged_in', 'true', {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    response.status(200).send(dataToken);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async changePassword(userDto: LoginUserDto) {
    // Проверьте существует ли пользователь
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Сохраняем пароль в поле для сброса пароля
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userService.saveResetPassword(user.id, hashPassword);
    const token = this.jwtService.sign({ id: user.id });
    // Отправляем письмо с токеном пользователю
    await this.mailService.sendMail(
      userDto.email,
      'Смена пароля',
      `Для смены пароля перейдите по этой ссылке: http://${process.env.HOST}:${process.env.POST}/auth/reset/?token=${token}`,
    );
    return {
      message:
        'На ваш email было направлено сообщение с сылкой для подтверждения смены пароля.',
    };
  }

  async resetPassword(token: string) {
    let decode: { id: string };
    try {
      decode = this.jwtService.verify(token);
    } catch (e) {
      throw new HttpException('Неверный токен', HttpStatus.BAD_REQUEST);
    }

    let user: User = await this.userService.getUserById(decode.id);

    if (user.resetpassword) {
      user.password = user.resetpassword;
      user.resetpassword = null;
      user.save();
      return { message: 'Пароль от учетной записи изменен.' };
    }

    return new HttpException('Не указан новый пароль', HttpStatus.BAD_REQUEST);
  }

  verifyToken(request: any) {
    if (request.headers.cookie.includes('access_token')) {
      const accesstToken =
        request.headers.cookie
          .split(';')
          .filter((e: string) => e.includes('access_token'))[0]
          .split('=')[1] || false;
      if (!accesstToken) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
      return this.jwtService.verify(accesstToken);
    }

    if (request.headers.authorization.includes('Bearer')) {
      const token = request.headers.authorization.split(' ')[1] || false;
      if (!token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
      return this.jwtService.verify(token);
    }

    throw new UnauthorizedException('Пользователь не авторизован');
  }

  checkToken(data: any) {
    return this.jwtService.verify(data.token);
  }

  logout(name: { cookieName: string }, response: any) {
    response.cookie(
      name.cookieName,
      { token: '' },
      {
        httpOnly: true,
        maxAge: -1,
        path: '/', // Указать путь, если был использован при установке
        domain: process.env.HOST,
      },
    );

    response.status(200).send({ token: 'logout' });
  }
}
