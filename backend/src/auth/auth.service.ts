import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return undefined;
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: Partial<User> & { id: string; email: string }): Promise<AuthResponseDto> {
    if (!user.id || !user.email) {
      throw new Error('User ID and email are required');
    }
    
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role || 'user' // Valeur par défaut pour le rôle
    };
    
    const now = new Date();
    const response = {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '24h',
      }),
      id: user.id,
      email: user.email,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      role: user.role || 'user',
      isActive: user.isActive !== undefined ? user.isActive : true,
      createdAt: user.createdAt || now,
      updatedAt: user.updatedAt || now
    } as AuthResponseDto;
    
    return response;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === '23505') { // Code d'erreur PostgreSQL pour violation de contrainte unique
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }
      throw error;
    }
  }
}
