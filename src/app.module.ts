import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthController } from './auth/auth.controller';
import { Role } from './users/entities/role.entity';
import { User } from './users/entities/user.entity';
import { ChemicalsModule } from './chemicals/chemicals.module';
import { Chemical } from './chemicals/entities/chemical.entity';
import { ChemicalItem } from './chemicals/entities/item.entity';
import { ChemicalController } from './chemicals/chemicals.controller';
import { HpEncryptionModule } from './hpEncrption/hpencryption.module';
import { Report } from './chemicals/entities/report.entity';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    HpEncryptionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'phamasecure',
      entities: [User, Role, Chemical, ChemicalItem, Report],
      synchronize: true,
    }),
    ChemicalsModule,
  ],
  controllers: [AppController, AuthController, ChemicalController],
  providers: [
AppService],
})
export class AppModule {}
