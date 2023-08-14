import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RoleModule } from './role/role.module';
import * as path from 'path';
import { Role } from './role/entities/role.entity';
import { UserRole } from './role/entities/user-role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: [User, Post, Role, UserRole],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    MailModule,
    FilesModule,
    PostsModule,
    RoleModule,
  ],
})
export class AppModule {}
