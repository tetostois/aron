import { Meal } from 'src/meals/meal.entity';
import { Order } from 'src/orders/order.entity';
export declare class Restaurant {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string;
    isActive: boolean;
    latitude: number;
    longitude: number;
    location: any;
    meals: Meal[];
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Restaurant>);
}
