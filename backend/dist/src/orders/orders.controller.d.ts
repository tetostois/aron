import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/user.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: {
        user: User;
    }): Promise<Order>;
    findAll(req: {
        user: User;
    }, status?: OrderStatus): Promise<Order[]>;
    findOne(id: string, req: {
        user: User;
    }): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto, req: {
        user: User;
    }): Promise<Order>;
    cancel(id: string, req: {
        user: User;
    }): Promise<Order>;
    getRestaurantOrders(req: {
        user: User;
    }, status?: OrderStatus): Promise<Order[]>;
    updateOrderStatus(id: string, status: OrderStatus, req: {
        user: User;
    }): Promise<Order>;
}
