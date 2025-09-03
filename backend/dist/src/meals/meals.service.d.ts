import { Repository } from 'typeorm';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealsService {
    private mealsRepository;
    constructor(mealsRepository: Repository<Meal>);
    create(createMealDto: CreateMealDto): Promise<Meal>;
    findAll(restaurantId?: string, isAvailable?: boolean): Promise<Meal[]>;
    findOne(id: string): Promise<Meal>;
    update(id: string, updateMealDto: UpdateMealDto): Promise<Meal>;
    remove(id: string): Promise<void>;
    updateAvailability(id: string, isAvailable: boolean): Promise<Meal>;
}
