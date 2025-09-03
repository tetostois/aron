import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  ParseFloatPipe,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto, Coordinates } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { RestaurantResponseDto } from './dto/restaurant-response.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
@ApiResponse({ 
  status: HttpStatus.TOO_MANY_REQUESTS, 
  description: 'Trop de requêtes. Veuillez réessayer plus tard.'
})
@ApiBearerAuth('JWT-auth')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: 'Créer un nouveau restaurant',
    description: 'Crée un nouveau restaurant. Nécessite les droits administrateur ou propriétaire de restaurant.'
  })
  @ApiCreatedResponse({ 
    description: 'Le restaurant a été créé avec succès',
    type: RestaurantResponseDto,
  })
  @ApiBadRequestResponse({ 
    description: 'Données de création invalides',
    schema: {
      example: {
        statusCode: 400,
        message: ['name should not be empty', 'address must be a string'],
        error: 'Bad Request'
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Droits insuffisants',
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Authentification requise',
  })
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantResponseDto> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Rechercher des restaurants',
    description: `Recherche des restaurants avec filtrage avancé, géolocalisation et pagination.\n\n` +
    `**Exemples d'utilisation**:\n` +
    `- Recherche par localisation: /restaurants?lat=48.8566&lng=2.3522&radius=10\n` +
    `- Filtrage par type de cuisine: /restaurants?cuisineType=italien\n` +
    `- Restaurants ouverts actuellement: /restaurants?isOpenNow=true\n` +
    `- Pagination: /restaurants?page=2&limit=20`
  })
  @ApiQuery({ 
    name: 'lat', 
    required: false, 
    type: Number,
    description: 'Latitude pour la recherche par proximité',
    example: 48.8566
  })
  @ApiQuery({ 
    name: 'lng', 
    required: false, 
    type: Number,
    description: 'Longitude pour la recherche par proximité',
    example: 2.3522
  })
  @ApiQuery({ 
    name: 'radius', 
    required: false, 
    type: Number,
    description: 'Rayon de recherche en kilomètres (défaut: 5km, max: 50km)',
    example: 10
  })
  @ApiQuery({ 
    name: 'cuisineType', 
    required: false, 
    type: String,
    description: 'Filtrer par type de cuisine (ex: italien, chinois, indien, etc.)',
    example: 'italien'
  })
  @ApiQuery({ 
    name: 'minRating', 
    required: false, 
    type: Number,
    description: 'Note minimale du restaurant (0-5 étoiles)',
    example: 4.0
  })
  @ApiQuery({ 
    name: 'isOpenNow', 
    required: false, 
    type: Boolean,
    description: 'Filtrer les restaurants actuellement ouverts',
    example: true
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number,
    description: 'Numéro de page pour la pagination (défaut: 1)',
    example: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Nombre de résultats par page (défaut: 10, max: 50)',
    example: 20
  })
  @ApiOkResponse({ 
    description: 'Liste paginée des restaurants correspondant aux critères',
    type: PaginatedResponseDto<RestaurantResponseDto>,
  })
  @ApiBadRequestResponse({ 
    description: 'Paramètres de requête invalides',
    schema: {
      example: {
        statusCode: 400,
        message: 'Les paramètres lat et lng doivent être fournis ensemble',
        error: 'Bad Request'
      }
    }
  })
  async find(
    @Query('lat', new DefaultValuePipe(NaN), ParseFloatPipe) lat: number = NaN,
    @Query('lng', new DefaultValuePipe(NaN), ParseFloatPipe) lng: number = NaN,
    @Query('radius', new DefaultValuePipe('5'), ParseIntPipe) radius: number = 5,
    @Query('cuisineType') cuisineType?: string,
    @Query('minRating', new DefaultValuePipe('0'), ParseFloatPipe) minRating: number = 0,
    @Query('isOpenNow', new DefaultValuePipe('false')) isOpenNow: boolean = false,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe('10'), ParseIntPipe) limit: number = 10,
  ) {
    // Validation des paramètres de géolocalisation
    if ((isNaN(lat) && !isNaN(lng)) || (!isNaN(lat) && isNaN(lng))) {
      throw new BadRequestException('Les paramètres lat et lng doivent être fournis ensemble');
    }

    // Limiter le nombre de résultats par page et le rayon de recherche
    limit = Math.min(limit, 50);
    radius = Math.min(radius, 50);
    
    // Calcul du décalage pour la pagination
    const skip = (page - 1) * limit;

    // Si des coordonnées sont fournies, effectuer une recherche par proximité
    if (!isNaN(lat) && !isNaN(lng)) {
      return this.restaurantsService.findNearby(
        { latitude: lat, longitude: lng },
        radius,
        {
          cuisineType,
          minRating: minRating > 0 ? minRating : undefined,
          isOpenNow,
          skip,
          limit,
        },
      );
    }

    // Sinon, effectuer une recherche simple avec pagination
    const where: any = { isActive: true };
    if (cuisineType) where.cuisineType = cuisineType;
    if (minRating > 0) where.averageRating = minRating;
    
    const [restaurants, count] = await this.restaurantsService.findAll({
      skip,
      take: limit,
      where,
    });

    return {
      data: restaurants,
      meta: {
        total: count,
        page,
        pageSize: limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtenir un restaurant par son ID',
    description: 'Récupère les détails complets d\'un restaurant spécifique avec ses menus et horaires d\'ouverture.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID unique du restaurant',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiQuery({
    name: 'include',
    required: false,
    type: String,
    description: 'Liste des relations à inclure (séparées par des virgules): meals, reviews, openingHours',
    example: 'meals,reviews'
  })
  @ApiOkResponse({ 
    description: 'Détails du restaurant',
    type: RestaurantResponseDto,
  })
  @ApiNotFoundResponse({ 
    description: 'Restaurant non trouvé',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant non trouvé',
        error: 'Not Found'
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'ID invalide',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request'
      }
    }
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') include?: string
  ): Promise<RestaurantResponseDto> {
    const relations: string[] = [];
    
    // Inclure les relations demandées
    if (include) {
      const includes = include.split(',');
      if (includes.includes('meals')) relations.push('meals');
      if (includes.includes('reviews')) relations.push('reviews');
      if (includes.includes('openingHours')) relations.push('openingHours');
    }
    
    return this.restaurantsService.findOne(id, { relations });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: 'Mettre à jour un restaurant',
    description: 'Met à jour les informations d\'un restaurant existant. Nécessite les droits administrateur ou propriétaire du restaurant.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID unique du restaurant à mettre à jour',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateRestaurantDto,
    description: 'Données à mettre à jour',
    required: true
  })
  @ApiOkResponse({ 
    description: 'Restaurant mis à jour avec succès',
    type: RestaurantResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant non trouvé',
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Droits insuffisants',
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Authentification requise',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: 'Supprimer un restaurant',
    description: 'Supprime un restaurant (soft delete). Nécessite les droits administrateur ou propriétaire du restaurant.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID unique du restaurant à supprimer',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT,
    description: 'Restaurant supprimé avec succès' 
  })
  @ApiNotFoundResponse({
    description: 'Restaurant non trouvé',
  })
  @ApiForbiddenResponse({
    description: 'Accès refusé - Droits insuffisants',
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Authentification requise',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.restaurantsService.remove(id);
  }
}
