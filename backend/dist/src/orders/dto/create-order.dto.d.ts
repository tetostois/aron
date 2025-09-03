import { OrderItemDto } from './order-item.dto';
import { OrderStatus } from '../order.entity';
export declare class CreateOrderDto {
    restaurantId: string;
    items: OrderItemDto[];
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    deliveryAddress?: string;
    specialInstructions?: string;
    status: OrderStatus;
}
