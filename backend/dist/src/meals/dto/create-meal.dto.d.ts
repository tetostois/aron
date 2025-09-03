import { MealCategory } from '../meal.entity';
export declare class CreateMealDto {
    name: string;
    description?: string;
    price: number;
    category?: MealCategory;
    imageUrl?: string;
    isAvailable?: boolean;
    restaurantId: string;
}
