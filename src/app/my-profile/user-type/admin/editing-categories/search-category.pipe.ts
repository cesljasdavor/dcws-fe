import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../../../../shared/category";

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(categories: Category[], searched: string): Category[] {
    if(!searched) {
      return categories;
    }
    return categories.filter((c: Category) => c.name.toUpperCase().includes(searched.toUpperCase()));
  }

}
