import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflect: Reflector,
    private authService: AuthService, // private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      //получаем роли из метаданных сохраненных в контексте контроллера
      const requiredRoles: string[] = this.reflect.getAllAndOverride('role', [
        context.getHandler(),
      ]);

      const req = context.switchToHttp().getRequest(); //получаем обькт запроса пользователя
      const user = this.authService.verifyToken(req); // проверяем валидность токена

      return user.roles.some((role: string) => requiredRoles.includes(role)); // если роль пользователя содержится в массиве ролей из мета данных контекста то возвращаем true
    } catch (e) {
      throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
    }
  }
}
