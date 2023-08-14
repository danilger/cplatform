import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';

describe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const mockRoleRepository = {
      find: jest.fn((id) => ({ id: id, role: 'admin' })),
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
