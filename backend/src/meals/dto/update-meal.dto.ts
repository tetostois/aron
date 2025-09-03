import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDto extends PartialType(CreateMealDto) {
  // Tous les champs sont optionnels grâce à PartialType
  // On peut ajouter des validations supplémentaires si nécessaire
}
