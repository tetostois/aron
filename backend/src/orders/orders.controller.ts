import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès', type: Order })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Un ou plusieurs repas non trouvés' })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: { user: User },
  ): Promise<Order> {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les commandes de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Order] })
  findAll(
    @Request() req: { user: User },
    @Query('status') status?: OrderStatus,
  ): Promise<Order[]> {
    return this.ordersService.findAll(req.user, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une commande par son ID' })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: User },
  ): Promise<Order> {
    return this.ordersService.findOne(id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande' })
  @ApiResponse({ status: 200, description: 'Commande mise à jour', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req: { user: User },
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto, req.user);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Annuler une commande' })
  @ApiResponse({ status: 200, description: 'Commande annulée', type: Order })
  @ApiResponse({ status: 400, description: 'Impossible d\'annuler la commande' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: User },
  ): Promise<Order> {
    return this.ordersService.cancelOrder(id, req.user);
  }

  // Routes pour le restaurant
  @Get('restaurant/orders')
  @ApiOperation({ summary: 'Lister les commandes du restaurant (propriétaire uniquement)' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [Order] })
  getRestaurantOrders(
    @Request() req: { user: User },
    @Query('status') status?: OrderStatus,
  ): Promise<Order[]> {
    // Vérifier que l'utilisateur est un propriétaire de restaurant
    // Cette logique devrait être implémentée dans un guard personnalisé
    return this.ordersService.getRestaurantOrders(req.user.id, status);
  }

  @Put('restaurant/orders/:id/status')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une commande (propriétaire uniquement)' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour', type: Order })
  @ApiResponse({ status: 400, description: 'Transition de statut invalide' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: OrderStatus,
    @Request() req: { user: User },
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, status, req.user.id);
  }
}
