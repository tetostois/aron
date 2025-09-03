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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const restaurant_entity_1 = require("./restaurant.entity");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const update_restaurant_dto_1 = require("./dto/update-restaurant.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let RestaurantsController = class RestaurantsController {
    restaurantsService;
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    create(createRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
    async find(lat = NaN, lng = NaN, radius = 5, cuisineType, minRating = 0, isOpenNow = false, page = 1, limit = 10) {
        if ((isNaN(lat) && !isNaN(lng)) || (!isNaN(lat) && isNaN(lng))) {
            throw new common_1.BadRequestException('Les paramètres lat et lng doivent être fournis ensemble');
        }
        limit = Math.min(limit, 50);
        const skip = (page - 1) * limit;
        if (!isNaN(lat) && !isNaN(lng)) {
            return this.restaurantsService.findNearby({ latitude: lat, longitude: lng }, radius, {
                cuisineType,
                minRating: minRating > 0 ? minRating : undefined,
                isOpenNow,
                skip,
                limit,
            });
        }
        const where = { isActive: true };
        if (cuisineType)
            where.cuisineType = cuisineType;
        if (minRating > 0)
            where.averageRating = minRating;
        const [restaurants, count] = await this.restaurantsService.findAll({
            skip,
            take: limit,
            where,
        });
        return {
            data: restaurants,
            meta: {
                total: count,
                page,
                pageSize: limit,
                totalPages: Math.ceil(count / limit),
            },
        };
    }
    async findOne(id, include) {
        const relations = [];
        if (include) {
            const includes = include.split(',');
            if (includes.includes('meals'))
                relations.push('meals');
            if (includes.includes('reviews'))
                relations.push('reviews');
            if (includes.includes('openingHours'))
                relations.push('openingHours');
        }
        return this.restaurantsService.findOne(id, { relations });
    }
    update(id, updateRestaurantDto) {
        return this.restaurantsService.update(id, updateRestaurantDto);
    }
    remove(id) {
        return this.restaurantsService.remove(id);
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau restaurant' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Restaurant créé avec succès', type: restaurant_entity_1.Restaurant }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Rechercher des restaurants',
        description: 'Recherche des restaurants avec filtrage et géolocalisation'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lat',
        required: false,
        type: Number,
        description: 'Latitude pour la recherche par proximité'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lng',
        required: false,
        type: Number,
        description: 'Longitude pour la recherche par proximité'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'radius',
        required: false,
        type: Number,
        description: 'Rayon de recherche en kilomètres (défaut: 5km)'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'cuisineType',
        required: false,
        type: String,
        description: 'Filtrer par type de cuisine'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minRating',
        required: false,
        type: Number,
        description: 'Note minimale du restaurant (0-5)'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isOpenNow',
        required: false,
        type: Boolean,
        description: 'Filtrer les restaurants ouverts actuellement'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Numéro de page pour la pagination (défaut: 1)'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Nombre de résultats par page (défaut: 10, max: 50)'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Liste des restaurants correspondant aux critères',
        type: [restaurant_entity_1.Restaurant]
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Paramètres de requête invalides' }),
    __param(0, (0, common_1.Query)('lat', new common_1.DefaultValuePipe(NaN), common_1.ParseFloatPipe)),
    __param(1, (0, common_1.Query)('lng', new common_1.DefaultValuePipe(NaN), common_1.ParseFloatPipe)),
    __param(2, (0, common_1.Query)('radius', new common_1.DefaultValuePipe('5'), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('cuisineType')),
    __param(4, (0, common_1.Query)('minRating', new common_1.DefaultValuePipe('0'), common_1.ParseFloatPipe)),
    __param(5, (0, common_1.Query)('isOpenNow', new common_1.DefaultValuePipe('false'))),
    __param(6, (0, common_1.Query)('page', new common_1.DefaultValuePipe('1'), common_1.ParseIntPipe)),
    __param(7, (0, common_1.Query)('limit', new common_1.DefaultValuePipe('10'), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, Number, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtenir un restaurant par son ID',
        description: 'Récupère les détails d\'un restaurant spécifique avec ses menus et horaires d\'ouverture'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Restaurant trouvé', type: restaurant_entity_1.Restaurant }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'ID invalide' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('include')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un restaurant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Restaurant mis à jour', type: restaurant_entity_1.Restaurant }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un restaurant (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Restaurant supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "remove", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, swagger_1.ApiTags)('restaurants'),
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
//# sourceMappingURL=restaurants.controller.js.map