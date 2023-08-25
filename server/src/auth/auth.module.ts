import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule),
    JwtModule.register({ secret: 'qwwwqw', signOptions: { expiresIn: '24h' } }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
