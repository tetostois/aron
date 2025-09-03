import { Restaurant } from '../restaurant.entity';
import { RestaurantResponseDto } from '../dto/restaurant-response.dto';

export class RestaurantMapper {
  static toResponseDto(restaurant: Restaurant & { distance?: number }): RestaurantResponseDto {
    const response: RestaurantResponseDto = {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description || null,
      address: restaurant.address,
      latitude: restaurant.latitude || null,
      longitude: restaurant.longitude || null,
      phone: restaurant.phone || null,
      email: restaurant.email || null,
      logoUrl: restaurant.logoUrl || null,
      coverImageUrl: restaurant.coverImageUrl || null,
      cuisineType: restaurant.cuisineType || null,
      averageRating: restaurant.averageRating || 0,
      reviewCount: restaurant.reviewCount || 0,
      deliveryTime: restaurant.deliveryTime || null,
      deliveryFee: restaurant.deliveryFee || null,
      isOpen: restaurant.isOpen || false,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
      meals: (restaurant as any).meals || [],
      openingHours: (restaurant as any).openingHours || [],
    };

    // Ajouter la distance si elle est présente (pour les recherches par proximité)
    if (typeof restaurant.distance !== 'undefined') {
      (response as any).distance = restaurant.distance;
    }

    return response;
      cuisineType: restaurant.cuisineType || null,
      averageRating: restaurant.averageRating || 0,
      reviewCount: restaurant.reviewCount || 0,
      deliveryTime: restaurant.deliveryTime || null,
      deliveryFee: restaurant.deliveryFee || null,
      distance: restaurant.distance || null,
      isOpen: restaurant.isOpen || false,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
      // Ces propriétés seront chargées si les relations sont incluses
      meals: (restaurant as any).meals || [],
      openingHours: (restaurant as any).openingHours || [],
    };
  }
}
