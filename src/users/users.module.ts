import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService]
})
export class UsersModule {}
