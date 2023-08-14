import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async remove(id: number) {
    const role = await this.roleRepository.findByPk(id);
    await role.destroy();
    return `Роль с id:${id} удалена.`;
  }
}
