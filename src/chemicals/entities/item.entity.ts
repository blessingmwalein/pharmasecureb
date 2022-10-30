import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
  } from 'typeorm';
  import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Chemical } from './chemical.entity';
  
  @Entity()
  export class ChemicalItem extends BaseEntity {
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
    qty:number;
  
    @ManyToOne(type => Chemical, chemical => chemical.items) 
    @JoinColumn({name: 'chemicalId'})
    chemical: Chemical; 
  }
  