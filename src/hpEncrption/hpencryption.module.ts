import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { HpencryptionService } from './hpencryption.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Chemical } from 'src/chemicals/entities/chemical.entity';
import { ChemicalItem } from 'src/chemicals/entities/item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Chemical, ChemicalItem])],
    controllers: [],
    providers: [
        HpencryptionService, ],
        exports: [HpencryptionService]
})
export class HpEncryptionModule {}
