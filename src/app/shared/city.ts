
export class City {
  constructor(
    public city?: string,
    public postal_code?: number,
    public id?: number
  ) {}

  static createSameCity(city: City): City {
    return new City(city.city, city.postal_code, city.id);
  }
}
