import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {Product} from "../shared/product";
import {Http, Response, Headers} from "@angular/http";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class ProductService {

  pageSize: number = 9;

  //svi produkti
  products: Product[] = [];

  private subscription: Subscription;
  constructor(private http: Http) {
    // //refresh produkata
    // let timer = Observable.timer(0, 10000000000);
    // timer.subscribe(() => this.getAllProducts());
  }


  getAllProducts(): Observable<Response> {
    const observable = this.http.get("http://localhost:3000/products/all_products.json");
    observable.map(
      (response: Response) => response.json()
    ).subscribe(
      data => {
        for(let product of data) {
          let categories: string[] = [];
          categories = product.categories.map((category: {name: string})=> category.name);
          product.categories = categories;
        }
        this.products = <Product[]> data;
      }
    );
    return observable;
  }

  getNumberOfProducts(): number {
    return this.products.length;
  }

  getPageProducts(page: number): Product[] {
    let pageProducts = [];
    //ubaci one elemente koji su na ovim indeksima
    for(let i=((page-1)*this.pageSize); i<((page)*this.pageSize) && i < this.products.length; i++){
      pageProducts.push(this.products[i]);
    }
    return pageProducts;
  }

  getVendorsProducts(email: string): Product[] {
    let products: Product[] = [];
    for(let product of this.products) {
        if(product.email_seller === email) {
          products.push(product);
        }
    }

    return products;
  }

  deleteProduct(product: Product): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/products/delete_product.json", JSON.stringify(product), {headers: headers});

    return observable;
  }

  updateProduct(oldValue: Product, newValue: Product): Observable<Response> {
    //predhodno je namješten id od novog što je jedino što nam je bitno za izmjenu u bazi
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/products/update_product.json", JSON.stringify(newValue), {headers: headers});

    return observable;
  }
  addProduct(product: Product): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/products/create_product.json", JSON.stringify(product), {headers: headers});

    return observable;
  }


  //ovdje stavi search
}
