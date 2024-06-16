import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../typeorm/entities/User';
import { UsersService } from '../users/services/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
