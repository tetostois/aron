import { Controller, Post, Body, UseGuards, Request, HttpStatus, UnauthorizedException, Request as Req } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBody, 
  ApiResponse, 
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthenticatedRequest extends Req {
  user: AuthenticatedUser;
}

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Inscription d\'un nouvel utilisateur',
    description: 'Crée un nouveau compte utilisateur avec un nom, un email et un mot de passe.'
  })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      basic: {
        value: {
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          password: 'motdepasse123'
        },
        summary: 'Exemple de création de compte',
        description: 'Tous les champs sont obligatoires. Le nom peut contenir un prénom et un nom séparés par un espace.'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Utilisateur enregistré avec succès',
    type: AuthResponseDto
  })
  @ApiConflictResponse({ 
    description: 'Un utilisateur avec cet email existe déjà',
    schema: {
      example: {
        statusCode: 409,
        message: 'Un utilisateur avec cet email existe déjà',
        error: 'Conflict'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Données de validation invalides',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters',
          'name should not be empty'
        ],
        error: 'Bad Request'
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.authService.register(createUserDto);
    // On utilise l'utilisateur créé pour générer un token de connexion
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ 
    summary: 'Connexion d\'un utilisateur',
    description: 'Authentifie un utilisateur avec son email et son mot de passe et retourne un token JWT.'
  })
  @ApiBody({ 
    type: LoginDto,
    examples: {
      basic: {
        value: {
          email: 'jean.dupont@example.com',
          password: 'motdepasse123'
        },
        summary: 'Exemple de connexion',
        description: 'Les champs email et mot de passe sont obligatoires.'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Connexion réussie',
    type: AuthResponseDto,
    content: {
      'application/json': {
        example: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'jean.dupont@example.com',
          firstName: 'Jean',
          lastName: 'Dupont',
          role: 'user',
          isActive: true,
          createdAt: '2023-09-03T12:00:00.000Z',
          updatedAt: '2023-09-03T12:00:00.000Z'
        }
      }
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'Identifiants invalides',
    schema: {
      example: {
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
        error: 'Unauthorized'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Données de validation invalides',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters'
        ],
        error: 'Bad Request'
      }
    }
  })
  async login(@Request() req: AuthenticatedRequest): Promise<AuthResponseDto> {
    if (!req.user?.id || !req.user?.email) {
      throw new UnauthorizedException('Données utilisateur invalides');
    }
    return this.authService.login({
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
      isActive: req.user.isActive,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt
    });
  }
}
