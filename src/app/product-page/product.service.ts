import { Injectable } from '@angular/core';
import {Product} from "../shared/product";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ProductService {

  pageSize: number = 9;

  //svi produkti
  products: Product[] = [];

  constructor(private http: Http) {
  }

  getAllProducts(): Observable<Response> {
    const observable =  this.http.get("http://localhost:3000/products/all_products.json");
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

  //poslije stavi id da ne moraš puno tražiti
  getVendorsProducts(email: string): Product[] {
    //za sada ovo poslije će se ovo mijenjati
    let products: Product[] = [];
    for(let product of this.products) {
        if(product.email_seller === email) {
          products.push(product);
        }
    }

    return products;
  }

  deleteProduct(product: Product) {
    //ovdje ide http
    let index = this.products.findIndex(
      (p: Product) => {
        if(p === product) return true;
        return false;
      }
    );
    this.products.splice(index, 1);
  }

  updateProduct(oldValue: Product, newValue: Product) {
    //ovdje ide http
    let index = this.products.findIndex(
      (p: Product) => {
        if(p === oldValue) return true;
        return false;
      }
    );
    this.products.splice(index, 1, newValue);
  }
  addProduct(product: Product) {
    //ovdje ide http
    this.products.push(product);
  }


  //ovdje stavi search
}
