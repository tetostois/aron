import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
  
  // Ajoutez ici d'autres champs spécifiques à la mise à jour si nécessaire
}
