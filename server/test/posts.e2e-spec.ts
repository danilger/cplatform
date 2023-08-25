import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PostsModule } from '../src/posts/posts.module';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Post } from '../src/posts/entities/post.entity';
import { User } from '../src/user/user.model';
import { Sequelize } from 'sequelize-typescript';

describe('PostsController(e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockPostRepository = {
      create: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
      providers: [
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },

        {
          provide: () => Sequelize,
          useValue: {},
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/posts GET`, () => {
    return request(app.getHttpServer()).get('/posts/').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
