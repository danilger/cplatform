import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { Tag } from './tag.entity';
import { PostTag } from './post-tag.entity';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  file: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Tag, () => PostTag)
  tag: [Tag];
}
