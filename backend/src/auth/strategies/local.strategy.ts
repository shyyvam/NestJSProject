import { Injectable, Logger, Res, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Response, Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private authService: AuthService){
        super();
    }

    async validate(username: string, password: string){
        const user = await this.authService.validateUser({username, password});
        if(!user) throw new UnauthorizedException();
        
        return user;
    }
}