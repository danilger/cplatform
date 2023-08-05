import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User } from 'src/user/user.model';
import { Post } from './entities/post.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Post, User]),
    forwardRef(() => AuthModule),
    forwardRef(() => FilesModule),
  ],
  exports: [PostsService],
})
export class PostsModule {}
