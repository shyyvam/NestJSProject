import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersService } from '../users/services/users/users.service';
import { AuthLoginPayloadDto } from './dtos/AuthLogin.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    /**
     * Validates the user by checking username's existence and password matching
     * and later makes a jwt token
     * @param userDetails 
     * @returns 
     */
    async validateUser(userDetails: AuthLoginPayloadDto, @Optional() response?: Response){
        const { username, password } = userDetails;
        const user = await this.userService.findOne({username});

        if(!user){
            throw new BadRequestException('Invalid credentials for user');
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid credentials for User');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        //httpOnly set to true so that browser can't access cookie via js
        // Set HTTP-only cookie in response if provided
        if (response) {
            response.cookie('jwt', jwt, { httpOnly: true });
        }else{
            return jwt;
        }

        return {
            message: "success",
            Jwt: jwt
        }
    }

    
}
