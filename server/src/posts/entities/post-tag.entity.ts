import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
} from 'sequelize-typescript';

import { Tag } from './tag.entity';
import { Post } from './post.entity';

@Table({ tableName: 'post-tag' })
export class PostTag extends Model<PostTag, any> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  idPost: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
  })
  idTag: number;
}
