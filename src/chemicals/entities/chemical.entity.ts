import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ChemicalItem } from './item.entity';

@Entity()
export class Chemical extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  timeline: string;

  @OneToMany((type) => ChemicalItem, (item) => item.chemical)
  items: ChemicalItem[];
}
