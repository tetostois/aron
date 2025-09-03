import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/user.entity';
import { MealsService } from '../meals/meals.service';
export declare class OrdersService {
    private ordersRepository;
    private mealsService;
    constructor(ordersRepository: Repository<Order>, mealsService: MealsService);
    create(createOrderDto: CreateOrderDto, user: User): Promise<Order>;
    findAll(user: User, status?: OrderStatus): Promise<Order[]>;
    findOne(id: string, user: User): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto, user: User): Promise<Order>;
    cancelOrder(id: string, user: User): Promise<Order>;
    getRestaurantOrders(restaurantId: string, status?: OrderStatus): Promise<Order[]>;
    updateOrderStatus(id: string, status: OrderStatus, restaurantId: string): Promise<Order>;
}
