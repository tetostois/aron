import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
}
