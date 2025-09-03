import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  UseGuards, 
  Request, 
  HttpStatus,
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Utilisateurs')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  private mapToUserResponseDto(user: User): UserResponseDto {
    // Create a new object with only the fields we want to expose
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined
    } as UserResponseDto;
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ 
    description: 'L\'utilisateur a été créé avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données de validation invalides',
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Un utilisateur avec cet email existe déjà',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return this.mapToUserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Récupérer le profil de l\'utilisateur connecté' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Profil utilisateur récupéré avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Non autorisé - Token JWT manquant ou invalide',
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Utilisateur non trouvé',
  })
  async getProfile(@Request() req): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(req.user.userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return this.mapToUserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Utilisateur trouvé',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ 
    description: 'Utilisateur non trouvé',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Vous ne pouvez accéder qu\'à votre propre profil',
  })
  async findOne(
    @Param('id') id: string,
    @Request() req
  ): Promise<UserResponseDto> {
    // Vérifier que l'utilisateur ne peut accéder qu'à son propre profil
    if (req.user.userId !== id && req.user.role !== 'admin') {
      throw new ForbiddenException('Accès non autorisé à cette ressource');
    }
    
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID "${id}" non trouvé`);
    }
    
    // Mapper l'entité User vers UserResponseDto
    return this.mapToUserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur à mettre à jour', type: 'string' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Utilisateur mis à jour avec succès',
    type: UserResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Vous ne pouvez modifier que votre propre profil',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ): Promise<UserResponseDto> {
    // Vérifier que l'utilisateur ne peut mettre à jour que son propre profil
    if (req.user.userId !== id && req.user.role !== 'admin') {
      throw new ForbiddenException('Accès non autorisé à cette ressource');
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return this.mapToUserResponseDto(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur à supprimer', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Utilisateur supprimé avec succès',
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Vous ne pouvez supprimer que votre propre compte',
  })
  async remove(
    @Param('id') id: string,
    @Request() req
  ): Promise<void> {
    // Vérifier que l'utilisateur ne peut supprimer que son propre compte
    if (req.user.userId !== id && req.user.role !== 'admin') {
      throw new ForbiddenException('Accès non autorisé à cette ressource');
    }
    return this.usersService.remove(id);
  }
}
