import { IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { OrderStatus } from '../order.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsOptional()
  deliveryFee: number = 0;

  @IsNumber()
  @IsOptional()
  tax: number = 0;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  deliveryAddress?: string;

  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}
