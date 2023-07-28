import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = this.authService.verifyToken(request); // проверяем валидность токена
    if (!user) {
      throw new UnauthorizedException('Не авторизованный пользователь');
    }

    const postId = Number(request.params.id);
    if (postId == user.id) {
      return true;
    } else {
      throw new HttpException(
        'Запись не принадлежит пользователю',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
