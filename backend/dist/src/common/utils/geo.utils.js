"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = calculateDistance;
exports.getBoundingBox = getBoundingBox;
exports.formatPoint = formatPoint;
function calculateDistance(coord1, coord2) {
    const R = 6371;
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toRad(degrees) {
    return (degrees * Math.PI) / 180;
}
function getBoundingBox(center, radiusInKm) {
    const R = 6371;
    const latR = radiusInKm / R;
    const lonR = radiusInKm / (R * Math.cos((Math.PI * center.latitude) / 180));
    const latRadian = latR * (180 / Math.PI);
    const lonRadian = lonR * (180 / Math.PI);
    return {
        minLat: center.latitude - latRadian,
        maxLat: center.latitude + latRadian,
        minLon: center.longitude - lonRadian,
        maxLon: center.longitude + lonRadian,
    };
}
function formatPoint(latitude, longitude) {
    return `POINT(${longitude} ${latitude})`;
}
//# sourceMappingURL=geo.utils.js.map