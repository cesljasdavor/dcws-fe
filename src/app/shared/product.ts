
import {ProfileService} from "../my-profile/profile.service";
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

  static createSameProduct(product: Product): Product {
    const categories = [];
    for(let c of product.categories) {
      categories.push(c);
    }
    return new Product(
      product.id_product,
      product.title,
      product.description,
      product.price,
      product.availability,
      product.picture,
      product.email_seller,
      categories
    );
  }

  static createEmptyProduct(email_seller: string): Product {
    return new Product(0,"","",0,true,null, email_seller, []);
  }
}
