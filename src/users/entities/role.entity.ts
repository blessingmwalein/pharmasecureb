
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  @IsString()
  name: string;
}
