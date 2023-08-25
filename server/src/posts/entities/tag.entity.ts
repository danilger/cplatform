import {
  Model,
  Table,
  DataType,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import { PostTag } from './post-tag.entity';
import { Post } from './post.entity';

interface TagCreateionAttrs {}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagCreateionAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Post, () => PostTag)
  post: [Post];
}
