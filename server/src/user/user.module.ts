import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/entities/post.entity';
import { UserRole } from '../role/entities/user-role.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Post, UserRole, Role]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
