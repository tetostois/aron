/**
 * Utilitaires pour les calculs géographiques
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calcule la distance en kilomètres entre deux points géographiques (formule de Haversine)
 * @param coord1 Première coordonnée {latitude, longitude}
 * @param coord2 Deuxième coordonnée {latitude, longitude}
 * @returns Distance en kilomètres
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convertit des degrés en radians
 */
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calcule la zone de délimitation (bounding box) autour d'un point
 * @param center Point central {latitude, longitude}
 * @param radiusInKm Rayon en kilomètres
 * @returns Coordonnées de la zone de délimitation
 */
export function getBoundingBox(center: Coordinates, radiusInKm: number) {
  const R = 6371; // Rayon de la Terre en km
  
  // Rayons angulaires en latitude et longitude
  const latR = radiusInKm / R;
  const lonR = radiusInKm / (R * Math.cos((Math.PI * center.latitude) / 180));
  
  // Conversion en degrés
  const latRadian = latR * (180 / Math.PI);
  const lonRadian = lonR * (180 / Math.PI);
  
  return {
    minLat: center.latitude - latRadian,
    maxLat: center.latitude + latRadian,
    minLon: center.longitude - lonRadian,
    maxLon: center.longitude + lonRadian,
  };
}

/**
 * Formate un point géographique pour une requête SQL
 */
export function formatPoint(latitude: number, longitude: number): string {
  return `POINT(${longitude} ${latitude})`;
}
