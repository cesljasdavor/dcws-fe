import { Injectable } from '@angular/core';
import {Product} from "../shared/product";
import {Http} from "@angular/http";

@Injectable()
export class ProductService {

  pageSize: number = 9;

  //svi produkti
  products: Product[] = [];

  constructor(private http: Http) {
    //samo dummy produkti prije nego se spojim sa serverom
    let product: Product;
    for(let i=0; i<20; i++) {
      product = new Product(
        i + 1 ,
        (i + 1) + ". proizvod",
        "Ovo je proizvodaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd" +
        "ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
        15.20*i,
        true,

      );
      if(i<10) {
        product.email_seller = "pero.peric@fer.hr";
      } else {
        product.email_seller = "stipe.stipic@blabla.hr";
      }
      product.categories=[];
      switch (i%3) {
        case 0:
          product.categories.push("Kategorija A");
          break;
        case 1:
          product.categories.push("Kategorija B");
          break;
        case 2:
          product.categories.push("Kategorija C");
          break;
      }
      this.products.push(product);
    }
  }

  getAllProducts(): Product[] {
    return this.products;
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
