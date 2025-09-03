import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Restaurant } from '../restaurant.entity';
import { IsUUID, IsString, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class OpeningHoursDto {
  @ApiProperty({
    example: 'Lundi',
    description: 'Jour de la semaine',
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  })
  day: string;

  @ApiPropertyOptional({
    example: '09:00',
    description: 'Heure d\'ouverture au format HH:mm',
    nullable: true
  })
  openTime?: string | null;

  @ApiPropertyOptional({
    example: '22:00',
    description: 'Heure de fermeture au format HH:mm',
    nullable: true
  })
  closeTime?: string | null;

  @ApiProperty({
    example: false,
    description: 'Indique si le restaurant est fermé toute la journée'
  })
  isClosed: boolean;
}

class MealDto {
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
    example: 'Pizza classique avec sauce tomate, mozzarella et basilic',
    description: 'Description du repas',
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

  @ApiProperty({
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

  @ApiProperty({
    example: true,
    description: 'Indique si le repas est disponible à la commande'
  })
  isAvailable: boolean;
}

export class RestaurantResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID unique du restaurant'
  })
  id: string;

  @ApiProperty({
    example: 'La Belle Pizza',
    description: 'Nom du restaurant'
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Un restaurant italien authentique avec des pâtes fraîches et des pizzas au feu de bois',
    description: 'Description du restaurant',
    nullable: true
  })
  description?: string | null;

  @ApiProperty({
    example: '123 Rue de la Paix, 75001 Paris',
    description: 'Adresse complète du restaurant'
  })
  address: string;

  @ApiPropertyOptional({
    example: 48.8566,
    description: 'Coordonnée de latitude du restaurant',
    type: Number,
    format: 'float',
    nullable: true
  })
  latitude?: number | null;

  @ApiPropertyOptional({
    example: 2.3522,
    description: 'Coordonnée de longitude du restaurant',
    type: Number,
    format: 'float',
    nullable: true
  })
  longitude?: number | null;

  @ApiPropertyOptional({
    example: '01 23 45 67 89',
    description: 'Numéro de téléphone du restaurant',
    nullable: true
  })
  phone?: string | null;

  @ApiPropertyOptional({
    example: 'contact@labellepizza.fr',
    description: 'Adresse email du restaurant',
    format: 'email',
    nullable: true
  })
  email?: string | null;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.jpg',
    description: 'URL du logo du restaurant',
    nullable: true
  })
  logoUrl?: string | null;

  @ApiPropertyOptional({
    example: 'https://example.com/cover.jpg',
    description: 'URL de la photo de couverture du restaurant',
    nullable: true
  })
  coverImageUrl?: string | null;

  @ApiPropertyOptional({
    example: 'italien',
    description: 'Type de cuisine du restaurant',
    nullable: true
  })
  cuisineType?: string | null;

  @ApiProperty({
    example: 4.5,
    description: 'Note moyenne du restaurant (0-5)',
    type: Number,
    format: 'float',
    minimum: 0,
    maximum: 5
  })
  averageRating: number;

  @ApiProperty({
    example: 42,
    description: 'Nombre total d\'avis sur le restaurant',
    type: 'integer'
  })
  reviewCount: number;

  @ApiPropertyOptional({
    example: 15,
    description: 'Temps de livraison moyen en minutes',
    type: 'integer',
    nullable: true
  })
  deliveryTime?: number | null;

  @ApiPropertyOptional({
    example: 2.5,
    description: 'Frais de livraison en euros',
    type: Number,
    format: 'float',
    nullable: true
  })
  deliveryFee?: number | null;

  @ApiPropertyOptional({
    example: 10,
    description: 'Distance en kilomètres par rapport à la position de l\'utilisateur',
    type: Number,
    format: 'float',
    nullable: true
  })
  distance?: number | null;

  @ApiPropertyOptional({
    type: [MealDto],
    description: 'Liste des repas disponibles au restaurant'
  })
  @Type(() => MealDto)
  @ValidateNested({ each: true })
  meals?: MealDto[];

  @ApiPropertyOptional({
    type: [OpeningHoursDto],
    description: 'Horaires d\'ouverture du restaurant par jour de la semaine'
  })
  @Type(() => OpeningHoursDto)
  @ValidateNested({ each: true })
  openingHours?: OpeningHoursDto[];

  @ApiProperty({
    example: true,
    description: 'Indique si le restaurant est actuellement ouvert'
  })
  isOpen: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Date de création du restaurant',
    type: 'string',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Date de dernière mise à jour du restaurant',
    type: 'string',
    format: 'date-time'
  })
  updatedAt: Date;
}
