import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = this.authService.verifyToken(request); // проверяем валидность токена

    if (!user) {
      throw new UnauthorizedException('Не авторизованный пользователь');
    }

    const postId = Number(request.params.id);
    const post = await this.postsService.findOne(postId);

    if (post.dataValues.userId == user.id) {
      return true;
    } else {
      throw new HttpException(
        'Запись не принадлежит пользователю',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
