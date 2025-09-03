export interface Coordinates {
    latitude: number;
    longitude: number;
}
export declare class CreateRestaurantDto {
    name: string;
    description?: string;
    address: string;
    phone?: string;
    email?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    coordinates?: Coordinates;
    isActive?: boolean;
}
