import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'backend/src/typeorm/entities/User';
import { CreateUserParams, LoginUserParams, UpdateUserParams } from 'backend/src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


/**
 * @decription User service for all the functions related to user
 */
@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name);

    /**
     * @description This constructor is made to use User table using User entity
     * @param userRepository 
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        ) {}

    /**
     * @description Function to get all the users
     * @returns all users from the user repository.
     */
    findUsers(){
        return this.userRepository.find({
            relations: ['profile']
        });
    }

    /**
     * @description Creates a user with the provided details and saves it to the database.
     * @param userDetails - The details of the user to be created.
     * @returns A Promise that resolves to the newly created user.
     * @throws Will throw an error if the user creation fails.
     */
    async createUser(userDetails: CreateUserParams): Promise<User> {
        // Extract password from userDetails
        const { password, ...userWithoutPassword } = userDetails;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = this.userRepository.create({ 
            ...userWithoutPassword, 
            password: hashedPassword,
            createdAt: new Date()
        }); 

        // Save the new user to the database. This is an asynchronous operation, so it returns a Promise.
        const user = this.userRepository.save(newUser);  

        //Removing password from the response
        delete (await user).password;

        return user;
    }

    /**
     * @description Updates a user with the provided details in the database.
     * @param id - The unique identifier of the user to be updated.
     * @param updateUserDetails - The details of the user to be updated
     * @returns A Promise that resolves to the number of affected rows.
     */
    async updateUser(id: number, updateUserDetails: UpdateUserParams){
        // Extract password from userDetails
        const { password, ...userWithoutPassword } = updateUserDetails;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        return this.userRepository.update({id}, { ...userWithoutPassword, password: hashedPassword});
    }

    /**
     * Deletes a user from the database based on the provided user ID.
     *
     * @param id - The unique identifier of the user to be deleted.
     * @returns A Promise that resolves to an object containing the number of affected rows.
     * @throws Will throw an error if the deletion operation fails.
     */
    deleteUser(id: number){
        return this.userRepository.delete({id});
    }

    async findOne(condition: any): Promise<User>{
        return this.userRepository.findOne({where: condition});
    }
}
