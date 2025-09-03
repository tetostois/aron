import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from '../restaurants/restaurant.entity';

export enum MealCategory {
  STARTER = 'starter',
  MAIN = 'main',
  DESSERT = 'dessert',
  DRINK = 'drink',
  SIDE = 'side',
}

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: MealCategory, default: MealCategory.MAIN })
  category: MealCategory;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ name: 'restaurant_id' })
  restaurantId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.meals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Meal>) {
    Object.assign(this, partial);
  }
}
