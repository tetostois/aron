import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


import { Meal } from 'src/meals/meal.entity';
import { Order } from 'src/orders/order.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  cuisineType: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ nullable: true })
  deliveryTime: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  deliveryFee: number;

  @Column({ default: false })
  isOpen: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: any;  // TypeORM gère automatiquement le type Point MySQL

  @OneToMany('Meal', (meal: Meal) => meal.restaurant)
  meals: Meal[];

  @OneToMany('Order', 'restaurant')
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Restaurant>) {
    Object.assign(this, partial);
  }
}
