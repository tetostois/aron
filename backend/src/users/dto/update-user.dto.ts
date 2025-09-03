import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Tous les champs sont optionnels grâce à PartialType
  // On peut ajouter des validations supplémentaires si nécessaire
}
