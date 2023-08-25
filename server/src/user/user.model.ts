import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from '../posts/entities/post.entity';
import { Role } from '../role/entities/role.entity';
import { UserRole } from '../role/entities/user-role.entity';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  resetpassword: string;

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: [Role];
}
