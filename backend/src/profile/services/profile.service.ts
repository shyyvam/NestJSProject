import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'backend/src/typeorm/entities/Profile';
import { User } from 'backend/src/typeorm/entities/User';
import { CreateUserProfileParams } from 'backend/src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

    /**
     * @description This constructor is made to use User table using User entity
     * @param profileRepository 
     */
     constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(User) private userRepository: Repository<User>
        ) {}


    /**
     * @description Creates a userProfile with the provided details and saves it to the database.
     * @param id - id of the user 
     * @param userProfileDetails - The details of the user's profile to be created.
     * @returns A Promise that resolves to the newly created user.
     * @throws Will throw an error if the userProfile creation fails.
     */
    async createUserProfile(
        id: number,
        userProfileDetails: CreateUserProfileParams
    ){
        const user = await this.userRepository.findOneBy({id});
        if(!user) 
            throw new HttpException(
                'User not found. Cannot create profile', 
                HttpStatus.BAD_REQUEST
            );

        const newProfile = this.profileRepository.create(userProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;

        return this.userRepository.save(user);
    }
}
