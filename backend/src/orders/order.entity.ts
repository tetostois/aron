import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
// Using string reference to break circular dependency
import { Meal } from '../meals/meal.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Meal)
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  constructor(partial: Partial<OrderItem>) {
    Object.assign(this, partial);
  }
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  restaurantId: string;

  @ManyToOne('Restaurant', 'orders')
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: any;

  @Column({ type: 'jsonb' })
  items: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveryFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ 
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING 
  })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  deliveryAddress: string;

  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
