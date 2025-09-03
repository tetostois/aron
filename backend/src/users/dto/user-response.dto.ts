import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID unique de l\'utilisateur',
  })
  id: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Adresse email de l\'utilisateur',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'Prénom de l\'utilisateur',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Nom de famille de l\'utilisateur',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: 'user',
    description: 'Rôle de l\'utilisateur',
    enum: ['user', 'admin', 'restaurant_owner'],
  })
  role: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Date de création du compte',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Date de dernière mise à jour du compte',
  })
  updatedAt: Date;

  @ApiProperty({
    example: true,
    description: 'Indique si le compte est activé',
    default: true
  })
  isActive: boolean;
}
