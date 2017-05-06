import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../../../shared/product";

@Pipe({
  name: 'searchMyProducts'
})
export class SearchMyProductsPipe implements PipeTransform {

  transform(products: Product[], searched: string): Product[] {
    if(!searched) {
      return products;
    }
    return products.filter((p: Product) => p.title.toUpperCase().includes(searched.toUpperCase()));
  }

}
