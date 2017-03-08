
export class Product {
  constructor(
    public id_product?: number,
    public title?: string,//
    public description?: string,//
    public price?: number,//
    public availability?: boolean,
    public picture?: string,
    public email_seller?: string,
    public categories?: string[]
  ) {}
}
