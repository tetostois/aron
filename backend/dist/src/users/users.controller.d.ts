import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getProfile(req: any): Promise<User | undefined>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
