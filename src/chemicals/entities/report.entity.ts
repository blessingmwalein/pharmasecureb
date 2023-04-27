import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Chemical } from './chemical.entity';

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  @IsString()
  user: string;

  @Column({ length: 150 })
  @IsString()
  date: string;

  @Column({ length: 150 })
  @IsString()
  reportType: string;

  @ManyToOne((type) => Chemical, (chemical) => chemical.items)
  @JoinColumn({ name: 'chemicalId' })
  chemical: Chemical;
}
