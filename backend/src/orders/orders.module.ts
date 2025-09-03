import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderItem } from './order.entity';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { MealsModule } from '../meals/meals.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    RestaurantsModule,
    MealsModule,
    UsersModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
