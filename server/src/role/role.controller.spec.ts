import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';


describe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const mockRoleRepository = {
      create: jest.fn().mockImplementation((role) => {
        return {
          ...role,
          id: 1,
          updatedAt: '',
          createdAt: '',
        };
      }),
      remove: jest.fn().mockImplementation((id) => {
        return `Роль с id:${id} удалена.`;
      }),
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

  it('should create a role', async () => {
    const createRoleDto = { role: 'redactor' };

    const expectedResponse = {
      id: expect.any(Number),
      role: 'redactor',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    };

    const result = await controller.create(createRoleDto);

    expect(result).toEqual(expectedResponse);
    expect(await controller.remove('1')).toBe('`Роль с id:1 удалена.`');
  });
});
 