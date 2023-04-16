import { Module } from '@nestjs/common';
import { ChemicalsService } from './chemicals.service';
import { Chemical } from './entities/chemical.entity';
import { ChemicalItem } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HpencryptionService } from 'src/hpEncrption/hpencryption.service';
@Module({
  imports: [TypeOrmModule.forFeature([Chemical, ChemicalItem])],
  exports: [TypeOrmModule, ChemicalsService],
  providers: [ChemicalsService,HpencryptionService]
})
export class ChemicalsModule {}
