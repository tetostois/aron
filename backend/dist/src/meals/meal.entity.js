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
exports.Meal = exports.MealCategory = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("../restaurants/restaurant.entity");
var MealCategory;
(function (MealCategory) {
    MealCategory["STARTER"] = "starter";
    MealCategory["MAIN"] = "main";
    MealCategory["DESSERT"] = "dessert";
    MealCategory["DRINK"] = "drink";
    MealCategory["SIDE"] = "side";
})(MealCategory || (exports.MealCategory = MealCategory = {}));
let Meal = class Meal {
    id;
    name;
    description;
    price;
    category;
    imageUrl;
    isAvailable;
    restaurantId;
    restaurant;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Meal = Meal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Meal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Meal.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MealCategory, default: MealCategory.MAIN }),
    __metadata("design:type", String)
], Meal.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Meal.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'restaurant_id' }),
    __metadata("design:type", String)
], Meal.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.meals, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Meal.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Meal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Meal.prototype, "updatedAt", void 0);
exports.Meal = Meal = __decorate([
    (0, typeorm_1.Entity)('meals'),
    __metadata("design:paramtypes", [Object])
], Meal);
//# sourceMappingURL=meal.entity.js.map