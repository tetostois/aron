import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [firstName, ...lastNameParts] = userData.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';
    
    const user = this.usersRepository.create({
      email: userData.email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      role: 'user', // Rôle par défaut
      isActive: true // Compte activé par défaut
    });
    
    return this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
