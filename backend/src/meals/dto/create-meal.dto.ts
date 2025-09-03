import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsUrl, IsBoolean } from 'class-validator';
import { MealCategory } from '../meal.entity';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(MealCategory)
  @IsOptional()
  category?: MealCategory = MealCategory.MAIN;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;
}
