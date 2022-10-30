import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { RoleDto } from '../../users/dto/user.dto';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  @IsString()
  firstName: string;

  @Column({ length: 150 })
  @IsString()
  lastName: string;

  @Column({ length: 150 })
  @IsString()
  username: string;

  @Column({ length: 150 })
  @IsString()
  password: string;

  @OneToOne((type) => Role)
  @JoinColumn()
  role: Role;
}
