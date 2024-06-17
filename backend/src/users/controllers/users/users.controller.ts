import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'backend/src/auth/guards/jwt.guard';
import { CreateUserDto } from 'backend/src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'backend/src/users/dtos/UpdateUser.dto';
import { UsersService } from 'backend/src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    //Added constructor to use usersService to inject it here
    constructor(private userService: UsersService){} 


    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsers(){
        console.log("Inside get users function");
        const users = await this.userService.findUsers();
        return users;
    }

    
    //Used in AuthController
    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto){
    //     return this.userService.createUser(createUserDto);  //DTO to be passed here
    // }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Param('id',ParseIntPipe) id:number,
        @Body() updateUserDto: UpdateUserDto
        ){
        await this.userService.updateUser(id, updateUserDto);

        return {
            message: "User updated!"
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(
        @Param('id',ParseIntPipe) id:number
        ){
        await this.userService.deleteUser(id);
    }

    
}
