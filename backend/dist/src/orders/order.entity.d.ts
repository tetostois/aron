import { User } from '../users/user.entity';
import { Meal } from '../meals/meal.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PREPARING = "preparing",
    READY_FOR_PICKUP = "ready_for_pickup",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class OrderItem {
    id: string;
    meal: Meal;
    quantity: number;
    price: number;
    specialInstructions: string;
    constructor(partial: Partial<OrderItem>);
}
export declare class Order {
    id: string;
    userId: string;
    user: User;
    restaurantId: string;
    restaurant: any;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    status: OrderStatus;
    deliveryAddress: string;
    specialInstructions: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Order>);
}
