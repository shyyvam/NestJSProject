import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserProfileDto } from '../dtos/CreateUserProfile.dto';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {

    //Added constructor to use usersService to inject it here
    constructor(private profileService: ProfileService){}

    @Post(':id')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ){
      return this.profileService.createUserProfile(id,createUserProfileDto);
    }
}
