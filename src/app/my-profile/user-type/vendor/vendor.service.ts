import { Injectable } from '@angular/core';
import {Product} from "../../../shared/product";
import {Http} from "@angular/http";
import {ProfileService} from "../../profile.service";
import {ProductService} from "../../../product-page/product.service";

@Injectable()
export class VendorService {

  pageSize: number = 9;

  myProducts:Product[] = [];

  constructor(private http: Http,
              private profileService: ProfileService,
              private productService: ProductService
  ) {
    this.myProducts = this.productService.getVendorsProducts(this.profileService.myProfile.email);
  }

  getNumberOfProducts(): number {
    return this.myProducts.length;
  }


  getPageProducts(page: number): Product[] {
    let pageProducts = [];
    //ubaci one elemente koji su na ovim indeksima
    for(let i=((page-1)*this.pageSize); i<((page)*this.pageSize) && i < this.myProducts.length; i++){
      pageProducts.push(this.myProducts[i]);
    }
    return pageProducts;
  }

  //add da se kaskadno dodaje da ne moramo ponovo kroz sve iterirati
  deleteProduct(product: Product) {
    //da ne moraš refreshat sve živo
    this.productService.deleteProduct(product);
    let index = this.myProducts.findIndex(
      (p: Product) => {
        if(p === product) return true;
        return false;
      }
    );
    this.myProducts.splice(index, 1);
    console.log(this.myProducts);
  }

  updateProduct(oldValue: Product, newValue: Product) {
    this.productService.updateProduct(oldValue, newValue);

    let index = this.myProducts.findIndex(
      (p: Product) => {
        if(p === oldValue) return true;
        return false;
      }
    );
    this.myProducts.splice(index, 1, newValue);
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
    this.myProducts.push(product);
  }



}
