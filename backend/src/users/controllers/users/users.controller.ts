import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserDto } from 'backend/src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'backend/src/users/dtos/UpdateUser.dto';
import { UsersService } from 'backend/src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    //Added constructor to use usersService to inject it here
    constructor(private userService: UsersService){} 


    @Get()
    async getUsers(){
        const users = await this.userService.findUsers();
        return users;
    }

    
    //Used in AuthController
    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto){
    //     return this.userService.createUser(createUserDto);  //DTO to be passed here
    // }

    @Put(':id')
    async updateUser(
        @Param('id',ParseIntPipe) id:number,
        @Body() updateUserDto: UpdateUserDto
        ){
        await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id',ParseIntPipe) id:number
        ){
        await this.userService.deleteUser(id);
    }

    
}
