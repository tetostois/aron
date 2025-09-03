import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  // Tous les champs sont optionnels grâce à PartialType
  // On peut ajouter des validations supplémentaires si nécessaire
}
