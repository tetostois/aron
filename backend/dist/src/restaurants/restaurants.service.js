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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
const geo_utils_1 = require("../common/utils/geo.utils");
let RestaurantsService = class RestaurantsService {
    restaurantsRepository;
    constructor(restaurantsRepository) {
        this.restaurantsRepository = restaurantsRepository;
    }
    async create(createRestaurantDto) {
        const restaurant = this.restaurantsRepository.create({
            ...createRestaurantDto,
            location: createRestaurantDto.latitude && createRestaurantDto.longitude
                ? (0, geo_utils_1.formatPoint)(createRestaurantDto.latitude, createRestaurantDto.longitude)
                : null
        });
        return this.restaurantsRepository.save(restaurant);
    }
    async findAll(options) {
        const defaultOptions = {
            where: { isActive: true },
            relations: ['meals'],
            skip: options?.skip,
            take: options?.limit,
        };
        if (options?.where) {
            defaultOptions.where = { ...defaultOptions.where, ...options.where };
        }
        return this.restaurantsRepository.findAndCount(defaultOptions);
    }
    async findOne(id, options) {
        const findOptions = {
            where: { id, isActive: true },
            relations: ['meals'],
            ...options,
        };
        const restaurant = await this.restaurantsRepository.findOne(findOptions);
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }
    async update(id, updateRestaurantDto) {
        const restaurant = await this.findOne(id);
        if (updateRestaurantDto.latitude !== undefined && updateRestaurantDto.longitude !== undefined) {
            updateRestaurantDto.location = (0, geo_utils_1.formatPoint)(updateRestaurantDto.latitude, updateRestaurantDto.longitude);
        }
        Object.assign(restaurant, updateRestaurantDto);
        return this.restaurantsRepository.save(restaurant);
    }
    async findNearby(coordinates, radiusInKm = 5, options = {}) {
        const { minLat, maxLat, minLon, maxLon } = (0, geo_utils_1.getBoundingBox)(coordinates, radiusInKm);
        const query = this.restaurantsRepository
            .createQueryBuilder('restaurant')
            .where('restaurant.isActive = :isActive', { isActive: true })
            .andWhere('restaurant.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
            .andWhere('restaurant.longitude BETWEEN :minLon AND :maxLon', { minLon, maxLon });
        if (options.cuisineType) {
            query.andWhere('restaurant.cuisineType = :cuisineType', {
                cuisineType: options.cuisineType
            });
        }
        if (options.minRating) {
            query.andWhere('restaurant.averageRating >= :minRating', {
                minRating: options.minRating
            });
        }
        if (options.isOpenNow) {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const currentTime = now.getHours() * 100 + now.getMinutes();
            query.andWhere(`EXISTS (SELECT 1 FROM restaurant_opening_hours WHERE 
          restaurant_id = restaurant.id AND 
          day_of_week = :dayOfWeek AND
          open_time <= :currentTime AND
          close_time >= :currentTime
        )`, { dayOfWeek, currentTime });
        }
        const [restaurants, count] = await query
            .skip(options.skip || 0)
            .take(options.limit || 10)
            .getManyAndCount();
        const restaurantsWithDistance = restaurants.map(restaurant => ({
            ...restaurant,
            distance: this.calculateDistance(coordinates, {
                latitude: parseFloat(restaurant.latitude),
                longitude: parseFloat(restaurant.longitude)
            })
        }));
        restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
        return {
            restaurants: restaurantsWithDistance,
            count
        };
    }
    calculateDistance(coord1, coord2) {
        const R = 6371;
        const dLat = this.toRad(coord2.latitude - coord1.latitude);
        const dLon = this.toRad(coord2.longitude - coord1.longitude);
        const lat1 = this.toRad(coord1.latitude);
        const lat2 = this.toRad(coord2.latitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
    async remove(id) {
        const result = await this.restaurantsRepository.update({ id, isActive: true }, { isActive: false });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Restaurant with ID ${id} not found`);
        }
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map