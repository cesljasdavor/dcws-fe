import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../../../shared/product";

@Pipe({
  name: 'searchMyProducts'
})
export class SearchMyProductsPipe implements PipeTransform {

  transform(products: Product[], title: string, category: string, toPrice: number, available: boolean): Product[] {
    return products.filter((p: Product) => {
      return this.compare(p, title, category, toPrice, available);
    });
  }

  private compare(p: Product,  title: string, category: string, toPrice: number, available: boolean): boolean {
    if(title !== "") {
      if(!p.title.toUpperCase().includes(title.toUpperCase())) {
        return false;
      }
    }

    if(category !== "") {
      if(p.categories === null ||
        p.categories.find((c: string) => c.toUpperCase().includes(category.toUpperCase())) === undefined) {
        return false;
      }
    }

    if(toPrice !== null) {
      if(p.price > toPrice) {
        return false;
      }
    }

    return p.availability === available;
  }
}
