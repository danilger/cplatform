import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
    private authService: AuthService,
  ) {}

  async create(createPostDto: CreatePostDto, image: any, request: any) {
    const user = this.authService.verifyToken(request);
    if (!user) {
      new UnauthorizedException('Пользователь не авторизован');
    }

    const fwres = await this.fileService.createFile(image);

    createPostDto = { ...createPostDto, file: fwres.file, userId: user.id };

    return this.postRepository.create(createPostDto);
  }

  findAll() {
    return this.postRepository.findAll();
  }

  findOne(id: number) {
    return this.postRepository.findByPk(id);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    request: any,
  ): Promise<Post> {
    let post: Post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Запись с id:${id} не найдена`);
    }
    await post.update(updatePostDto);
    return post;
  }

  async remove(id: number, request: any): Promise<string> {
    let post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Запись с id:${id} не найдена`);
    }
    await post.destroy();
    return 'Пост удален';
  }
}
