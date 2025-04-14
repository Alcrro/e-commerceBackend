import { DeliveryPrice } from '../../domain/entities/DelieryPrice';
import { DeliveryPriceRepository } from '../../domain/interfaces/DeliveryPriceRepository';

export class DeliveryPriceRepositoryImpl implements DeliveryPriceRepository {
  private BASE_PRICE = 5; // Base delivery cost ($5)
  private PRICE_PER_KM = 1; // Price per km ($1 per km)
  private SPEED_KMH = 40; // Average delivery speed (40 km/h)

  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180; // Convert degrees to radians

    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(lat2 - lat1); // Difference in latitude, converted to radians
    const dLon = toRad(lon2 - lon1); // Difference in longitude, converted to radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Square of half the latitude difference
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) * // Cosine of both latitudes
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2); // Square of half the longitude difference

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Compute the central angle

    return R * c; // Multiply by Earth's radius to get the distance in kilometers
  }

  calculatePriceByAddress(addressId: string): Promise<DeliveryPrice> {
    throw new Error('Method not implemented.');
  }
  async estimateDelivery(
    productLocation: { lat: number; lng: number },
    customerAddress: { lat: number; lng: number }
  ): Promise<DeliveryPrice> {
    const distance = this.haversineDistance(
      productLocation.lat,
      productLocation.lng,
      customerAddress.lat,
      customerAddress.lng
    );

    const distanceFee = distance * this.PRICE_PER_KM;

    const totalPrice = this.BASE_PRICE + distanceFee;
    const estimatedTime = (distance / this.SPEED_KMH) * 60;

    return {
      id: 'estimate_' + Date.now(),
      addressId: 'N/A',
      basePrice: this.BASE_PRICE,
      distanceFee,
      totalPrice,
      estimatedTime: Math.ceil(estimatedTime),
    };
  }
}
