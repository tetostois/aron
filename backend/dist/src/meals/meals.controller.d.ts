import { MealsService } from './meals.service';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealsController {
    private readonly mealsService;
    constructor(mealsService: MealsService);
    create(createMealDto: CreateMealDto): Promise<Meal>;
    findAll(restaurantId?: string, available?: boolean): Promise<Meal[]>;
    findOne(id: string): Promise<Meal>;
    update(id: string, updateMealDto: UpdateMealDto): Promise<Meal>;
    remove(id: string): Promise<void>;
    updateAvailability(id: string, available: boolean): Promise<Meal>;
}
