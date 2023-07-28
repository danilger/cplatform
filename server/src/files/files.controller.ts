import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Roles } from 'src/auth/auth.role.decorator';
import { RolesGuard } from 'src/auth/auth.role.guard';

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Roles('administrator')
  @UseGuards(RolesGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.fileService.createFile(file);
  }

  @Roles('administrator')
  @UseGuards(RolesGuard)
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFiles(@UploadedFiles() files) {
    return this.fileService.createFiles(files);
  }
}
