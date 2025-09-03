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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderItem = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const meal_entity_1 = require("../meals/meal.entity");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PREPARING"] = "preparing";
    OrderStatus["READY_FOR_PICKUP"] = "ready_for_pickup";
    OrderStatus["OUT_FOR_DELIVERY"] = "out_for_delivery";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let OrderItem = class OrderItem {
    id;
    meal;
    quantity;
    price;
    specialInstructions;
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => meal_entity_1.Meal),
    (0, typeorm_1.JoinColumn)({ name: 'meal_id' }),
    __metadata("design:type", meal_entity_1.Meal)
], OrderItem.prototype, "meal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "specialInstructions", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)('order_items'),
    __metadata("design:paramtypes", [Object])
], OrderItem);
let Order = class Order {
    id;
    userId;
    user;
    restaurantId;
    restaurant;
    items;
    subtotal;
    deliveryFee;
    tax;
    total;
    status;
    deliveryAddress;
    specialInstructions;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Restaurant', 'orders'),
    (0, typeorm_1.JoinColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", Object)
], Order.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders'),
    __metadata("design:paramtypes", [Object])
], Order);
//# sourceMappingURL=order.entity.js.map