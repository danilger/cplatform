/*

  - Регистрация новых пользователей
  - Аутентификация пользователей по логину и паролю
  - Восстановление пароля
  - Шифрование паролей и обеспечение безопасности аутентификации
  - Управление учетными записями пользователей

*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create.user.dto';
import { Role } from '../role/entities/role.entity';
import { setRoleDto } from './dto/set.role.dto';
import { UserRole } from '../role/entities/user-role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    return user;
  }

  async saveResetPassword(id: number, resetPassword: string) {
    const user = await this.userRepository.findByPk(id);
    if (user && resetPassword) {
      user.resetpassword = resetPassword;
      await user.save();
      return true;
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async setRole(setRoleDto: setRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { role: setRoleDto.role },
    });
    const user = await this.userRepository.findByPk(setRoleDto.userId);
    if (!role || !user) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
    return await user.$add('roles', role.id);
  }
}
