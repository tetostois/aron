import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/user.entity';
import { MealsService } from '../meals/meals.service';
import { OrderItem } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private mealsService: MealsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    // Vérifier que tous les repas existent
    const mealIds = createOrderDto.items.map(item => item.mealId);
    const meals = await this.mealsService.findAll(undefined, true);
    
    const validMeals = meals.filter(meal => mealIds.includes(meal.id));
    if (validMeals.length !== mealIds.length) {
      throw new NotFoundException('One or more meals not found or not available');
    }

    // Créer la commande
    const order = this.ordersRepository.create({
      ...createOrderDto,
      userId: user.id,
      status: OrderStatus.PENDING,
      items: createOrderDto.items.map(item => ({
        meal: { id: item.mealId },
        quantity: item.quantity,
        price: item.price,
        specialInstructions: item.specialInstructions,
      })),
    });

    return this.ordersRepository.save(order);
  }

  async findAll(user: User, status?: OrderStatus): Promise<Order[]> {
    const where: any = { userId: user.id };
    if (status) {
      where.status = status;
    }
    
    return this.ordersRepository.find({
      where,
      relations: ['restaurant', 'items.meal'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, userId: user.id },
      relations: ['restaurant', 'items.meal', 'user'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
    user: User,
  ): Promise<Order> {
    const order = await this.findOne(id, user);
    
    // Mise à jour du statut uniquement pour l'instant
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }
    
    return this.ordersRepository.save(order);
  }

  async cancelOrder(id: string, user: User): Promise<Order> {
    const order = await this.findOne(id, user);
    
    // Vérifier si la commande peut être annulée
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new Error('Order cannot be cancelled at this stage');
    }
    
    order.status = OrderStatus.CANCELLED;
    return this.ordersRepository.save(order);
  }

  // Méthodes pour le restaurant
  async getRestaurantOrders(restaurantId: string, status?: OrderStatus): Promise<Order[]> {
    const where: any = { restaurantId };
    if (status) {
      where.status = status;
    }
    
    return this.ordersRepository.find({
      where,
      relations: ['user', 'items.meal'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus, restaurantId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, restaurantId },
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    // Validation de la transition d'état
    const validTransitions = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
      [OrderStatus.PREPARING]: [OrderStatus.READY_FOR_PICKUP],
      [OrderStatus.READY_FOR_PICKUP]: [OrderStatus.OUT_FOR_DELIVERY],
      [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
    };
    
    if (validTransitions[order.status] && !validTransitions[order.status].includes(status)) {
      throw new Error(`Invalid status transition from ${order.status} to ${status}`);
    }
    
    order.status = status;
    return this.ordersRepository.save(order);
  }
}
