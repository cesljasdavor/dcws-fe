import { Injectable } from '@angular/core';
import {Category} from "../shared/category";
import {Http} from "@angular/http";

@Injectable()
export class CategoryService {

  pageSize: number = 6;

  categories: Category[] = [
    new Category("Kategorija A", "Ovo je kategorija Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
    new Category("Kategorija B", "Ovo je kategorija B"),
    new Category("Kategorija C", "Ovo je kategorija C"),
    new Category("Kategorija D", "Ovo je kategorija D")
  ];

  constructor(private http: Http) { }

  getCategories(): Category[] {
    //poziv na server ako je categories prazan
    return this.categories;
  }

  getNumberOfCategories(): number {
    return this.categories.length;
  }

  getPageCategories(page: number): Category[] {
    let pageProducts = [];
    //ubaci one elemente koji su na ovim indeksima
    for(let i=((page-1)*this.pageSize); i<((page)*this.pageSize) && i < this.categories.length; i++){
      pageProducts.push(this.categories[i]);
    }
    return pageProducts;
  }

  /*kategorije bi se samostalno trebale updateati jer će promijeniti referencu jedinp treba neki trigger koji
    će pokrenut neku lavinu
  */
  updateCategory(oldValue: Category, newValue: Category) {
    //predaješ to u http requestu, a ovdje samo mijenjaš referencu, jer nije potrebno ponovo ažurirati kategorije
    let index = this.categories.findIndex(
      (c: Category) => {
        if(c===oldValue) return true;
        return false;
    });
    this.categories.splice(index,1,newValue);
  }


  deleteCategory(category: Category) {
    let index = this.categories.findIndex(
      (c: Category) => {
        if(c===category) return true;
        return false;
      });
    this.categories.splice(index,1);
  }

  addCategory(category: Category) {
    //možda implementirati da se ovo nemre multiplicirati
    this.categories.push(category);
  }


}
