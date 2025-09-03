import { Repository, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Coordinates } from '../common/utils/geo.utils';
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
export declare class RestaurantsService {
    private restaurantsRepository;
    constructor(restaurantsRepository: Repository<Restaurant>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(options?: FindAllOptions<Restaurant>): Promise<[Restaurant[], number]>;
    findOne(id: string, options?: FindOneOptions<Restaurant>): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto & {
        location?: any;
    }): Promise<Restaurant>;
    findNearby(coordinates: Coordinates, radiusInKm?: number, options?: FindNearbyOptions): Promise<{
        restaurants: (Restaurant & {
            distance: number;
        })[];
        count: number;
    }>;
    private calculateDistance;
    private toRad;
    remove(id: string): Promise<void>;
}
export {};
