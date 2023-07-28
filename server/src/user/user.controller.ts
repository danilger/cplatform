import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { RolesGuard } from 'src/auth/auth.role.guard';
import { Roles } from 'src/auth/auth.role.decorator';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Roles('administrator')
  @UseGuards(RolesGuard)
  @Post()
  CreateUser(@Body() dto: CreateUserDto) {
    return this.UserService.createUser(dto);
  }

  @Roles('administrator')
  @UseGuards(RolesGuard)
  @Get(':value')
  GetUser(@Param('value') id: string) {
    return this.UserService.getUserById(id);
  }
}
