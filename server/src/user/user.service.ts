/*

  - Регистрация новых пользователей
  - Аутентификация пользователей по логину и паролю
  - Восстановление пароля
  - Шифрование паролей и обеспечение безопасности аутентификации
  - Управление учетными записями пользователей

*/

import { Injectable, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return user;
  }

  getUserById(id: string) {
    const user = this.userRepository.findByPk(id);
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
}
