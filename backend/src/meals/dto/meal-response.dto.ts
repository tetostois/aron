import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsBoolean, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class MealResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID unique du repas'
  })
  id: string;

  @ApiProperty({
    example: 'Pizza Margherita',
    description: 'Nom du repas'
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Pizza classique avec sauce tomate, mozzarella et basilic frais',
    description: 'Description détaillée du repas',
    nullable: true
  })
  description?: string | null;

  @ApiProperty({
    example: 12.99,
    description: 'Prix du repas en euros',
    type: Number,
    format: 'float'
  })
  price: number;

  @ApiPropertyOptional({
    example: 'https://example.com/images/pizza-margherita.jpg',
    description: 'URL de l\'image du repas',
    nullable: true
  })
  imageUrl?: string | null;

  @ApiProperty({
    example: 'main',
    description: 'Catégorie du repas',
    enum: ['starter', 'main', 'dessert', 'drink', 'side']
  })
  category: string;

  @ApiPropertyOptional({
    example: ['sans gluten', 'végétarien'],
    description: 'Liste des étiquettes du repas',
    type: [String],
    default: []
  })
  tags?: string[];

  @ApiProperty({
    example: true,
    description: 'Indique si le repas est disponible à la commande'
  })
  isAvailable: boolean;

  @ApiPropertyOptional({
    example: 450,
    description: 'Nombre de calories pour une portion',
    type: 'integer',
    nullable: true
  })
  calories?: number | null;

  @ApiPropertyOptional({
    example: ['gluten', 'lactose'],
    description: 'Liste des allergènes présents dans le repas',
    type: [String],
    default: []
  })
  allergens?: string[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID du restaurant auquel ce repas appartient'
  })
  restaurantId: string;

  @ApiPropertyOptional({
    example: 'La Bella Italia',
    description: 'Nom du restaurant (peut être inclus dans la réponse étendue)'
  })
  restaurantName?: string;

  @ApiProperty({
    example: '2023-01-01T12:00:00.000Z',
    description: 'Date de création du repas',
    type: 'string',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00.000Z',
    description: 'Date de dernière mise à jour du repas',
    type: 'string',
    format: 'date-time'
  })
  updatedAt: Date;

  // Méthode statique pour mapper l'entité vers le DTO
  static fromEntity(meal: any): MealResponseDto {
    const dto = new MealResponseDto();
    dto.id = meal.id;
    dto.name = meal.name;
    dto.description = meal.description;
    dto.price = meal.price;
    dto.imageUrl = meal.imageUrl;
    dto.category = meal.category;
    dto.tags = meal.tags || [];
    dto.isAvailable = meal.isAvailable;
    dto.calories = meal.calories;
    dto.allergens = meal.allergens || [];
    dto.restaurantId = meal.restaurantId;
    
    // Si l'entité a une relation avec le restaurant
    if (meal.restaurant) {
      dto.restaurantName = meal.restaurant.name;
    }
    
    dto.createdAt = meal.createdAt;
    dto.updatedAt = meal.updatedAt;
    
    return dto;
  }
}
