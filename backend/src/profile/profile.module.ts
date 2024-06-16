import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile, User])],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}
