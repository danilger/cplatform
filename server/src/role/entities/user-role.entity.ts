import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
// import { User } from 'src/user/user.model';
import { User } from '../../user/user.model';
import { Role } from './role.entity';

@Table({ tableName: 'user-role' })
export class UserRole extends Model<UserRole, any> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  idRole: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  idUser: number;
}
