import { Restaurant } from '../restaurants/restaurant.entity';
export declare enum MealCategory {
    STARTER = "starter",
    MAIN = "main",
    DESSERT = "dessert",
    DRINK = "drink",
    SIDE = "side"
}
export declare class Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    category: MealCategory;
    imageUrl: string;
    isAvailable: boolean;
    restaurantId: string;
    restaurant: Restaurant;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Meal>);
}
