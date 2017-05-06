import {Injectable, OnDestroy} from '@angular/core';
import {Category} from "../shared/category";
import {Http, Response, Headers} from "@angular/http";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class CategoryService {

  pageSize: number = 6;

  categories: Category[] = [];

  constructor(private http: Http) { }

  getCategories(): Observable<Response> {
    let observable = this.http.get("http://localhost:3000/categories/all_categories.json");
    observable.map(response => response.json())
              .subscribe(data =>{
                //makni sve koji su trenutno ovdje
                this.categories.splice(0, this.categories.length);
                //napuni s novim rezultatima
                for(let category of <Category[]>data) {
                  this.categories.push(category);
                }
              });
    return observable;
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


  /*
  dohvati kategorije sa servera, a pošali referencu na polje koje ćeš napuniti
  kada stignu podaci
  */
  requireCategories(): Category[] {
    if(this.categories.length === 0) {
      this.getCategories();
    }
    return this.categories;
  }

  /*
  kategorije bi se samostalno trebale updateati jer će promijeniti referencu jedinp treba neki trigger koji
  će pokrenut neku lavinu
  */
  updateCategory(oldValue: Category, newValue: Category): Observable<Response> {
    const update = {oldValue: oldValue, newValue: newValue};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/categories/update_category.json", JSON.stringify(update), {headers: headers})

    return observable;
  }


  deleteCategory(category: Category): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/categories/delete_category.json", JSON.stringify(category), {headers: headers})

    return observable;
  }

  addCategory(category: Category): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/categories/create_category.json", JSON.stringify(category), {headers: headers})

    return observable;
  }

}
