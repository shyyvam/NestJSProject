import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [TypeOrmModule.forRoot({  //Database credentials
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'shivam',
      database: 'crud',
      entities: [User, Profile],
      synchronize: true //set it false in prod
  }), UsersModule, ProfileModule, AuthModule, ProductsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
