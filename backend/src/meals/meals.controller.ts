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
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau repas' })
  @ApiResponse({ status: 201, description: 'Repas créé avec succès', type: Meal })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les repas' })
  @ApiResponse({ status: 200, description: 'Liste des repas', type: [Meal] })
  findAll(
    @Query('restaurantId') restaurantId?: string,
    @Query('available', new DefaultValuePipe(false), ParseBoolPipe) available?: boolean,
  ): Promise<Meal[]> {
    return this.mealsService.findAll(restaurantId, available);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un repas par son ID' })
  @ApiResponse({ status: 200, description: 'Repas trouvé', type: Meal })
  @ApiResponse({ status: 404, description: 'Repas non trouvé' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Meal> {
    return this.mealsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un repas' })
  @ApiResponse({ status: 200, description: 'Repas mis à jour', type: Meal })
  @ApiResponse({ status: 404, description: 'Repas non trouvé' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMealDto: UpdateMealDto,
  ): Promise<Meal> {
    return this.mealsService.update(id, updateMealDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un repas' })
  @ApiResponse({ status: 200, description: 'Repas supprimé' })
  @ApiResponse({ status: 404, description: 'Repas non trouvé' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mealsService.remove(id);
  }

  @Put(':id/availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour la disponibilité d\'un repas' })
  @ApiResponse({ status: 200, description: 'Disponibilité mise à jour', type: Meal })
  @ApiResponse({ status: 404, description: 'Repas non trouvé' })
  updateAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('available', ParseBoolPipe) available: boolean,
  ): Promise<Meal> {
    return this.mealsService.updateAvailability(id, available);
  }
}
