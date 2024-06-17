import { Body, Controller, Post, Logger, Res, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/services/users/users.service';
import { AuthService } from './auth.service';
import { AuthLoginPayloadDto } from './dtos/AuthLogin.dto';
import { AuthRegisterPayloadDto } from './dtos/AuthRegister.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    //For logging values on console
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        private jwtService: JwtService
    ){}

    @Post('register')
    async register(@Body() authRegisterDto: AuthRegisterPayloadDto){
        const user =  this.userService.createUser(authRegisterDto);

        return user;
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(
        @Body() authLoginDto: AuthLoginPayloadDto,
        @Res({passthrough: true}) response: Response //to send cookie to frontend
        ){

        return this.authService.validateUser(authLoginDto, response);
    }

    @Get('user')
    async user(@Req() request: Request){
        try{
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if(!data){
                throw new UnauthorizedException;
            }

            const user = await this.userService.findOne({id: data['id']});

            const {password, ...response} = user;

            return response;
        }catch(e){
            throw new UnauthorizedException;
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response){
        response.clearCookie('jwt');

        return {
            message: 'You have logged out!'
        }
    }
}
