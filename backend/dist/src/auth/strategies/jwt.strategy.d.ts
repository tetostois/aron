import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
type JwtPayload = {
    sub: string;
    email: string;
    role: string;
};
type DoneFunction = (error: Error | null, user?: any) => void;
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(req: Request, payload: JwtPayload, done: DoneFunction): Promise<any>;
}
export {};
