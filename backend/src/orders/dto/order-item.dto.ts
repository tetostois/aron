import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class OrderItemDto {
  @IsString()
  @IsUUID()
  mealId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  specialInstructions?: string;
}
