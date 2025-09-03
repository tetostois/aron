import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'utilisateur@example.com',
    description: 'Adresse email de l\'utilisateur',
  })
  @IsEmail({}, { message: 'Format d\'email invalide' })
  @IsNotEmpty({ message: 'L\'email est requis' })
  email: string;

  @ApiProperty({
    example: 'MotDePasse123!',
    description: 'Mot de passe de l\'utilisateur',
    minLength: 8,
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;
}
