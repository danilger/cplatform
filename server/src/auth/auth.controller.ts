import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSevice: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res() response: any) {
    return this.authSevice.login(loginUserDto, response);
  }

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authSevice.registration(userDto);
  }

  @Post('changepassword')
  async chahgePassword(@Body() loginUserDto: LoginUserDto) {
    return await this.authSevice.changePassword(loginUserDto);
  }

  @Get('reset')
  async confirmChahgePassword(@Query('token') token: string) {
    return await this.authSevice.resetPassword(token);
  }

  @Post('guard')
  async checkToken(@Body() data: any) {
    return await this.authSevice.checkToken(data);
  }

  @Post('logout')
  logout(@Body() cookieName: { cookieName: string }, @Res() response: any) {
    this.authSevice.logout(cookieName, response);
  }
}
