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
      product.email_seller = "pero.peric@fer.hr";
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

  //ovdje stavi search
}
