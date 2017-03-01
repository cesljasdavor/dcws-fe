import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/product";

@Component({
  selector: 'dcws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page: number = 1;

  pageSize: number = 9;

  //svi produkti
  products: Product[] = [];

  //produkti ovisno o stranici
  pageProducts: Product[] = [];
  constructor() { }

  changePage() {
    this.pageProducts = [];
    //ubaci one elemente koji su na ovim indeksima
    for(let i=((this.page-1)*this.pageSize); i<((this.page)*this.pageSize) && i < this.products.length; i++){
      this.pageProducts.push(this.products[i]);
    }
  }

  ngOnInit() {
    let product: Product;
    for(let i=0; i<20; i++) {
      product = new Product(
        i + 1 ,
        (i + 1) + ". proizvod",
        "Ovo je proizvod",
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
    //inicijalizacija pagea
    this.changePage();

  }

}
