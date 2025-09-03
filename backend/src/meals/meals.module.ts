import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Meal } from './meal.entity';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal]),
    RestaurantsModule,
  ],
  providers: [MealsService],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
