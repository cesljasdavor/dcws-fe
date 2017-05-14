import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../shared/product";
import {Category} from "../../shared/category";

@Pipe({
  name: 'mainSearch'
})
export class MainSearchPipe implements PipeTransform {

  transform(products: Product[], searchedText: string, searchedCategory: Category): Product[] {
    if(products.length === 0) {
      return products;
    }
    return products.filter((p:Product) => {
      //prvo ispitaj tekst
      if(searchedText !== undefined && searchedText.length !== 0) {
        if(!p.title.toUpperCase().includes(searchedText.toUpperCase())) {
          return false;
        }
      }

      //ispitivanje kategorija
      if(searchedCategory !== null) {
        if(p.categories.find((c:string) => c === searchedCategory.name) === undefined) {
          return false;
        }
      }

      return true;
    });
  }

}
