import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEmail, IsUrl, Min, Max } from 'class-validator';

// Interface pour les coordonnées GPS
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(-90, { message: 'La latitude doit être comprise entre -90 et 90 degrés' })
  @Max(90, { message: 'La latitude doit être comprise entre -90 et 90 degrés' })
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @Min(-180, { message: 'La longitude doit être comprise entre -180 et 180 degrés' })
  @Max(180, { message: 'La longitude doit être comprise entre -180 et 180 degrés' })
  @IsOptional()
  longitude?: number;

  // Champ pour la validation des coordonnées
  @IsOptional()
  coordinates?: Coordinates;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
