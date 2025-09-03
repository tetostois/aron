export interface Coordinates {
    latitude: number;
    longitude: number;
}
export declare function calculateDistance(coord1: Coordinates, coord2: Coordinates): number;
export declare function getBoundingBox(center: Coordinates, radiusInKm: number): {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
};
export declare function formatPoint(latitude: number, longitude: number): string;
