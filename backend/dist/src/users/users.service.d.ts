import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findOne(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    update(id: string, updateData: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
