import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const meal = this.mealsRepository.create(createMealDto);
    return this.mealsRepository.save(meal);
  }

  async findAll(restaurantId?: string, isAvailable?: boolean): Promise<Meal[]> {
    const where: any = {};
    
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    
    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable;
    }
    
    return this.mealsRepository.find({
      where,
      relations: ['restaurant'],
    });
  }

  async findOne(id: string): Promise<Meal> {
    const meal = await this.mealsRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    
    return meal;
  }

  async update(
    id: string,
    updateMealDto: UpdateMealDto,
  ): Promise<Meal> {
    const meal = await this.findOne(id);
    Object.assign(meal, updateMealDto);
    return this.mealsRepository.save(meal);
  }

  async remove(id: string): Promise<void> {
    const result = await this.mealsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<Meal> {
    const meal = await this.findOne(id);
    meal.isAvailable = isAvailable;
    return this.mealsRepository.save(meal);
  }
}
