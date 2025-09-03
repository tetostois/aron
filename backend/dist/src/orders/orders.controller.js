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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const order_entity_1 = require("./order.entity");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto, req) {
        return this.ordersService.create(createOrderDto, req.user);
    }
    findAll(req, status) {
        return this.ordersService.findAll(req.user, status);
    }
    findOne(id, req) {
        return this.ordersService.findOne(id, req.user);
    }
    update(id, updateOrderDto, req) {
        return this.ordersService.update(id, updateOrderDto, req.user);
    }
    cancel(id, req) {
        return this.ordersService.cancelOrder(id, req.user);
    }
    getRestaurantOrders(req, status) {
        return this.ordersService.getRestaurantOrders(req.user.id, status);
    }
    updateOrderStatus(id, status, req) {
        return this.ordersService.updateOrderStatus(id, status, req.user.id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commande créée avec succès', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Un ou plusieurs repas non trouvés' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les commandes de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des commandes', type: [order_entity_1.Order] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une commande par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande trouvée', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande mise à jour', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Annuler une commande' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande annulée', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Impossible d\'annuler la commande' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancel", null);
__decorate([
    (0, common_1.Get)('restaurant/orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les commandes du restaurant (propriétaire uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des commandes', type: [order_entity_1.Order] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getRestaurantOrders", null);
__decorate([
    (0, common_1.Put)('restaurant/orders/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour le statut d\'une commande (propriétaire uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut mis à jour', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Transition de statut invalide' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map