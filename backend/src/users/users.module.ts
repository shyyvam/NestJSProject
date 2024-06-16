import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'backend/src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],  //We need to tell module which Module is imported
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
