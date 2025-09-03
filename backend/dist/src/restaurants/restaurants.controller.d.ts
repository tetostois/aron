import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    find(lat?: number, lng?: number, radius?: number, cuisineType?: string, minRating?: number, isOpenNow?: boolean, page?: number, limit?: number): Promise<{
        restaurants: (Restaurant & {
            distance: number;
        })[];
        count: number;
    } | {
        data: Restaurant[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, include?: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: string): Promise<void>;
}
