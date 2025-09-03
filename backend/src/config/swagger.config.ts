import { DocumentBuilder, type OpenAPIObject } from '@nestjs/swagger';

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('API Food Delivery')
  .setDescription('API pour la gestion des commandes de nourriture en ligne')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Entrez le token JWT',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
