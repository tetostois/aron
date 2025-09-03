"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const meals_service_1 = require("../meals/meals.service");
let OrdersService = class OrdersService {
    ordersRepository;
    mealsService;
    constructor(ordersRepository, mealsService) {
        this.ordersRepository = ordersRepository;
        this.mealsService = mealsService;
    }
    async create(createOrderDto, user) {
        const mealIds = createOrderDto.items.map(item => item.mealId);
        const meals = await this.mealsService.findAll(undefined, true);
        const validMeals = meals.filter(meal => mealIds.includes(meal.id));
        if (validMeals.length !== mealIds.length) {
            throw new common_1.NotFoundException('One or more meals not found or not available');
        }
        const order = this.ordersRepository.create({
            ...createOrderDto,
            userId: user.id,
            status: order_entity_1.OrderStatus.PENDING,
            items: createOrderDto.items.map(item => ({
                meal: { id: item.mealId },
                quantity: item.quantity,
                price: item.price,
                specialInstructions: item.specialInstructions,
            })),
        });
        return this.ordersRepository.save(order);
    }
    async findAll(user, status) {
        const where = { userId: user.id };
        if (status) {
            where.status = status;
        }
        return this.ordersRepository.find({
            where,
            relations: ['restaurant', 'items.meal'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, user) {
        const order = await this.ordersRepository.findOne({
            where: { id, userId: user.id },
            relations: ['restaurant', 'items.meal', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto, user) {
        const order = await this.findOne(id, user);
        if (updateOrderDto.status) {
            order.status = updateOrderDto.status;
        }
        return this.ordersRepository.save(order);
    }
    async cancelOrder(id, user) {
        const order = await this.findOne(id, user);
        if (order.status !== order_entity_1.OrderStatus.PENDING && order.status !== order_entity_1.OrderStatus.CONFIRMED) {
            throw new Error('Order cannot be cancelled at this stage');
        }
        order.status = order_entity_1.OrderStatus.CANCELLED;
        return this.ordersRepository.save(order);
    }
    async getRestaurantOrders(restaurantId, status) {
        const where = { restaurantId };
        if (status) {
            where.status = status;
        }
        return this.ordersRepository.find({
            where,
            relations: ['user', 'items.meal'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateOrderStatus(id, status, restaurantId) {
        const order = await this.ordersRepository.findOne({
            where: { id, restaurantId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        const validTransitions = {
            [order_entity_1.OrderStatus.PENDING]: [order_entity_1.OrderStatus.CONFIRMED, order_entity_1.OrderStatus.CANCELLED],
            [order_entity_1.OrderStatus.CONFIRMED]: [order_entity_1.OrderStatus.PREPARING, order_entity_1.OrderStatus.CANCELLED],
            [order_entity_1.OrderStatus.PREPARING]: [order_entity_1.OrderStatus.READY_FOR_PICKUP],
            [order_entity_1.OrderStatus.READY_FOR_PICKUP]: [order_entity_1.OrderStatus.OUT_FOR_DELIVERY],
            [order_entity_1.OrderStatus.OUT_FOR_DELIVERY]: [order_entity_1.OrderStatus.DELIVERED],
        };
        if (validTransitions[order.status] && !validTransitions[order.status].includes(status)) {
            throw new Error(`Invalid status transition from ${order.status} to ${status}`);
        }
        order.status = status;
        return this.ordersRepository.save(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        meals_service_1.MealsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map