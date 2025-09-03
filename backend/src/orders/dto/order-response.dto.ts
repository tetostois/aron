import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../order-status.enum';

class OrderItemDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID unique de l\'élément de commande'
  })
  id: string;

  @ApiProperty({
    example: 'Pizza Margherita',
    description: 'Nom du repas commandé'
  })
  mealName: string;

  @ApiProperty({
    example: '550e8400-e29b-12d3-a456-426614174000',
    description: 'ID du repas commandé'
  })
  mealId: string;

  @ApiProperty({
    example: 12.99,
    description: 'Prix unitaire du repas au moment de la commande',
    type: Number,
    format: 'float'
  })
  unitPrice: number;

  @ApiProperty({
    example: 2,
    description: 'Quantité commandée',
    type: 'integer'
  })
  quantity: number;

  @ApiProperty({
    example: 25.98,
    description: 'Prix total pour cette ligne (prix unitaire × quantité)',
    type: Number,
    format: 'float'
  })
  totalPrice: number;

  @ApiPropertyOptional({
    example: 'Sans oignons, avec pâte bien cuite',
    description: 'Instructions spéciales pour cet article',
    nullable: true
  })
  specialInstructions?: string | null;
}

class OrderStatusHistoryDto {
  @ApiProperty({
    enum: OrderStatus,
    description: 'Statut de la commande'
  })
  status: OrderStatus;

  @ApiProperty({
    example: '2023-01-01T12:30:00.000Z',
    description: 'Date et heure du changement de statut',
    type: 'string',
    format: 'date-time'
  })
  changedAt: Date;

  @ApiPropertyOptional({
    example: 'Commande confirmée par le restaurant',
    description: 'Commentaire ou raison du changement de statut',
    nullable: true
  })
  comment?: string | null;

  @ApiPropertyOptional({
    example: 'Jean Dupont',
    description: 'Nom de la personne ayant effectué le changement',
    nullable: true
  })
  changedBy?: string | null;
}

export class OrderResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID unique de la commande'
  })
  id: string;

  @ApiProperty({
    example: 'ORDER-2023-001',
    description: 'Numéro de commande lisible par l\'humain'
  })
  orderNumber: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID de l\'utilisateur ayant passé la commande'
  })
  userId: string;

  @ApiProperty({
    example: 'Jean Dupont',
    description: 'Nom du client ayant passé la commande'
  })
  userName: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a456-426614174000',
    description: 'ID du restaurant concerné par la commande'
  })
  restaurantId: string;

  @ApiProperty({
    example: 'La Bella Pizza',
    description: 'Nom du restaurant concerné par la commande'
  })
  restaurantName: string;

  @ApiProperty({
    type: [OrderItemDto],
    description: 'Détails des articles commandés'
  })
  items: OrderItemDto[];

  @ApiProperty({
    example: 38.97,
    description: 'Sous-total de la commande (hors frais de livraison)',
    type: Number,
    format: 'float'
  })
  subtotal: number;

  @ApiProperty({
    example: 2.99,
    description: 'Frais de livraison',
    type: Number,
    format: 'float'
  })
  deliveryFee: number;

  @ApiProperty({
    example: 41.96,
    description: 'Montant total de la commande (sous-total + frais de livraison)',
    type: Number,
    format: 'float'
  })
  totalAmount: number;

  @ApiProperty({
    enum: OrderStatus,
    description: 'Statut actuel de la commande',
    example: OrderStatus.CONFIRMED
  })
  status: OrderStatus;

  @ApiProperty({
    type: [OrderStatusHistoryDto],
    description: 'Historique des changements de statut de la commande',
    isArray: true
  })
  statusHistory: OrderStatusHistoryDto[];

  @ApiProperty({
    example: '123 Rue de la Paix, 75001 Paris',
    description: 'Adresse de livraison'
  })
  deliveryAddress: string;

  @ApiPropertyOptional({
    example: 'Sonner à l\'interphone B',
    description: 'Instructions spéciales pour la livraison',
    nullable: true
  })
  deliveryInstructions?: string | null;

  @ApiPropertyOptional({
    example: '2023-01-01T12:30:00.000Z',
    description: 'Heure souhaitée pour la livraison',
    type: 'string',
    format: 'date-time',
    nullable: true
  })
  preferredDeliveryTime?: string | null;

  @ApiProperty({
    example: 'CARTE',
    description: 'Méthode de paiement utilisée',
    enum: ['CARTE', 'EN_LIGNE', 'A_LA_LIVRAISON']
  })
  paymentMethod: string;

  @ApiProperty({
    example: 'PAYEE',
    description: 'Statut du paiement',
    enum: ['EN_ATTENTE', 'PAYEE', 'ECHOUEE', 'REMBOURSEE']
  })
  paymentStatus: string;

  @ApiProperty({
    example: '2023-01-01T12:00:00.000Z',
    description: 'Date et heure de création de la commande',
    type: 'string',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T12:05:00.000Z',
    description: 'Date et heure de dernière mise à jour de la commande',
    type: 'string',
    format: 'date-time'
  })
  updatedAt: Date;

  // Méthode statique pour mapper l'entité vers le DTO
  static fromEntity(order: any): OrderResponseDto {
    const dto = new OrderResponseDto();
    
    dto.id = order.id;
    dto.orderNumber = order.orderNumber;
    dto.userId = order.userId;
    dto.userName = order.user?.fullName || 'Utilisateur inconnu';
    dto.restaurantId = order.restaurantId;
    dto.restaurantName = order.restaurant?.name || 'Restaurant inconnu';
    
    // Mapper les articles de la commande
    dto.items = order.items?.map(item => ({
      id: item.id,
      mealName: item.mealName,
      mealId: item.mealId,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      specialInstructions: item.specialInstructions
    })) || [];
    
    dto.subtotal = order.subtotal;
    dto.deliveryFee = order.deliveryFee;
    dto.totalAmount = order.totalAmount;
    dto.status = order.status;
    
    // Mapper l'historique des statuts
    dto.statusHistory = order.statusHistory?.map(history => ({
      status: history.status,
      changedAt: history.changedAt,
      comment: history.comment,
      changedBy: history.changedBy?.name || 'Système'
    })) || [];
    
    dto.deliveryAddress = order.deliveryAddress;
    dto.deliveryInstructions = order.deliveryInstructions;
    dto.preferredDeliveryTime = order.preferredDeliveryTime?.toISOString();
    dto.paymentMethod = order.paymentMethod;
    dto.paymentStatus = order.paymentStatus;
    dto.createdAt = order.createdAt;
    dto.updatedAt = order.updatedAt;
    
    return dto;
  }
}
