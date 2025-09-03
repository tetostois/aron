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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
let Restaurant = class Restaurant {
    id;
    name;
    description;
    address;
    phone;
    email;
    imageUrl;
    isActive;
    latitude;
    longitude;
    location;
    meals;
    orders;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'point', spatialFeatureType: 'Point', srid: 4326, nullable: true }),
    __metadata("design:type", Object)
], Restaurant.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Meal', (meal) => meal.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "meals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Order', 'restaurant'),
    __metadata("design:type", Array)
], Restaurant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)('restaurants'),
    __metadata("design:paramtypes", [Object])
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map