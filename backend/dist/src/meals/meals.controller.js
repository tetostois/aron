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
exports.MealsController = void 0;
const common_1 = require("@nestjs/common");
const meals_service_1 = require("./meals.service");
const meal_entity_1 = require("./meal.entity");
const create_meal_dto_1 = require("./dto/create-meal.dto");
const update_meal_dto_1 = require("./dto/update-meal.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let MealsController = class MealsController {
    mealsService;
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    create(createMealDto) {
        return this.mealsService.create(createMealDto);
    }
    findAll(restaurantId, available) {
        return this.mealsService.findAll(restaurantId, available);
    }
    findOne(id) {
        return this.mealsService.findOne(id);
    }
    update(id, updateMealDto) {
        return this.mealsService.update(id, updateMealDto);
    }
    remove(id) {
        return this.mealsService.remove(id);
    }
    updateAvailability(id, available) {
        return this.mealsService.updateAvailability(id, available);
    }
};
exports.MealsController = MealsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau repas' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Repas créé avec succès', type: meal_entity_1.Meal }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_dto_1.CreateMealDto]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les repas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des repas', type: [meal_entity_1.Meal] }),
    __param(0, (0, common_1.Query)('restaurantId')),
    __param(1, (0, common_1.Query)('available', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir un repas par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Repas trouvé', type: meal_entity_1.Meal }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Repas non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un repas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Repas mis à jour', type: meal_entity_1.Meal }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Repas non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un repas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Repas supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Repas non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/availability'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour la disponibilité d\'un repas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disponibilité mise à jour', type: meal_entity_1.Meal }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Repas non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('available', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], MealsController.prototype, "updateAvailability", null);
exports.MealsController = MealsController = __decorate([
    (0, swagger_1.ApiTags)('meals'),
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsController);
//# sourceMappingURL=meals.controller.js.map