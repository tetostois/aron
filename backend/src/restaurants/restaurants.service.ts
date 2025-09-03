import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantResponseDto } from './dto/restaurant-response.dto';
import { RestaurantMapper } from './mappers/restaurant.mapper';
import { Coordinates, getBoundingBox, formatPoint } from '../common/utils/geo.utils';

interface FindAllOptions<T> extends FindManyOptions<T> {
  where?: FindOptionsWhere<T>;
  skip?: number;
  take?: number;
  limit?: number;
}

interface FindNearbyOptions {
  cuisineType?: string;
  minRating?: number;
  isOpenNow?: boolean;
  skip?: number;
  limit?: number;
}

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);

  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantResponseDto> {
    const restaurant = this.restaurantsRepository.create({
      ...createRestaurantDto,
      location: createRestaurantDto.latitude && createRestaurantDto.longitude 
        ? formatPoint(createRestaurantDto.latitude, createRestaurantDto.longitude)
        : null,
      averageRating: 0,
      reviewCount: 0,
      isOpen: false
    });
    
    const savedRestaurant = await this.restaurantsRepository.save(restaurant);
    return RestaurantMapper.toResponseDto(savedRestaurant);
  }

  async findAll(options?: FindAllOptions<Restaurant>): Promise<[Restaurant[], number]> {
    const defaultOptions: FindManyOptions<Restaurant> = {
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

  async findOne(id: string, options?: FindOneOptions<Restaurant>): Promise<RestaurantResponseDto> {
    const findOptions: FindOneOptions<Restaurant> = {
      where: { id, isActive: true },
      relations: ['meals'],
      ...options,
    };
    
    const restaurant = await this.restaurantsRepository.findOne(findOptions);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    
    return RestaurantMapper.toResponseDto(restaurant);
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto & { location?: any },
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    
    // Mettre à jour la localisation si les coordonnées changent
    if (updateRestaurantDto.latitude !== undefined && updateRestaurantDto.longitude !== undefined) {
      updateRestaurantDto.location = formatPoint(
        updateRestaurantDto.latitude,
        updateRestaurantDto.longitude
      );
    }
    
    Object.assign(restaurant, updateRestaurantDto);
    return this.restaurantsRepository.save(restaurant);
  }

  /**
   * Trouve les restaurants à proximité d'un point donné
   * @param coordinates Coordonnées du point central {latitude, longitude}
   * @param radiusInKm Rayon de recherche en kilomètres
   * @param options Options supplémentaires (filtres, pagination, etc.)
   */
  async findNearby(
    coordinates: Coordinates,
    radiusInKm: number = 5,
    options: FindNearbyOptions = {}
  ): Promise<{ restaurants: (Restaurant & { distance: number })[]; count: number }> {
    const { minLat, maxLat, minLon, maxLon } = getBoundingBox(coordinates, radiusInKm);
    
    // Requête de base avec filtrage par zone géographique
    const query = this.restaurantsRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.isActive = :isActive', { isActive: true })
      .andWhere('restaurant.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
      .andWhere('restaurant.longitude BETWEEN :minLon AND :maxLon', { minLon, maxLon });
    
    // Filtres optionnels
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
    
    // Filtre d'ouverture (à implémenter avec la logique d'horaires d'ouverture)
    if (options.isOpenNow) {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 (dimanche) à 6 (samedi)
      const currentTime = now.getHours() * 100 + now.getMinutes(); // Format HHMM
      
      // Exemple de logique simplifiée (à adapter selon votre modèle de données)
      query.andWhere(
        `EXISTS (SELECT 1 FROM restaurant_opening_hours WHERE 
          restaurant_id = restaurant.id AND 
          day_of_week = :dayOfWeek AND
          open_time <= :currentTime AND
          close_time >= :currentTime
        )`,
        { dayOfWeek, currentTime }
      );
    }
    
    // Pagination
    const [restaurants, count] = await query
      .skip(options.skip || 0)
      .take(options.limit || 10)
      .getManyAndCount();
    
    // Calcul de la distance pour chaque restaurant
    const restaurantsWithDistance = restaurants.map(restaurant => ({
      ...restaurant,
      distance: this.calculateDistance(coordinates, {
        latitude: parseFloat(restaurant.latitude as any),
        longitude: parseFloat(restaurant.longitude as any)
      })
    }));
    
    // Tri par distance
    restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
    
    return {
      restaurants: restaurantsWithDistance,
      count
    };
  }
  
  /**
   * Calcule la distance entre deux points géographiques
   * @param coord1 Première coordonnée
   * @param coord2 Deuxième coordonnée
   * @returns Distance en kilomètres
   */
  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(coord2.latitude - coord1.latitude);
    const dLon = this.toRad(coord2.longitude - coord1.longitude);
    const lat1 = this.toRad(coord1.latitude);
    const lat2 = this.toRad(coord2.latitude);

    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  /**
   * Convertit des degrés en radians
   */
  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }


  async remove(id: string): Promise<void> {
    // Soft delete (mise à jour du statut isActive à false)
    const result = await this.restaurantsRepository.update(
      { id, isActive: true },
      { isActive: false },
    );
    
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }
}
