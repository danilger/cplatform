import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { UserRole } from './user-role.entity';

interface RoleCreationAttrs {
  id: number;
  role: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttrs> {
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
  role: string;

  @BelongsToMany(() => User, () => UserRole)
  user: [User];
}
