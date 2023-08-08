import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import { promises as fs } from 'fs';

interface MulterFile {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class FilesService {
  async createFile(file: MulterFile): Promise<{ file: string; path: string }> {
    try {
      console.log(file);
      const ext = file.originalname.split('.')[1];
      const fileName = uuid.v4() + '.' + ext;
      const filePath = path.resolve(__dirname, '..', 'static');
      try {
        await fs.access(filePath);
      } catch {
        await fs.mkdir(filePath, { recursive: true });
      }
      await fs.writeFile(path.join(filePath, fileName), file.buffer);
      return { file: fileName, path: filePath };
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFiles(files: MulterFile[]): Promise<{ message: string }> {
    for (const file of files) {
      this.createFile(file).catch((error) => {
        console.error(
          `Ошибка при создании файла ${file.originalname}: ${error.message}`,
        );
      });
    }
    return { message: 'Файлы загружаются асинхронно' };
  }
}
