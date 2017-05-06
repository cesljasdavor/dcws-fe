import { Injectable } from '@angular/core';
import {Product} from "../../../shared/product";
import {Http, Response} from "@angular/http";
import {ProfileService} from "../../profile.service";
import {ProductService} from "../../../product-page/product.service";
import {Observable} from "rxjs";

@Injectable()
export class VendorService {

  pageSize: number = 9;

  myProducts:Product[] = [];

  constructor(private profileService: ProfileService,
              public productService: ProductService
  ) {
    this.refresh();
  }

  refresh() {
    //netrebaš raditi http zahtjev jer ćeš sve produkte dobiti kroz paljenje stranice
    this.myProducts = this.productService.getVendorsProducts(this.profileService.myProfile.email);
  }

  requireMyProducts() {
    if(this.myProducts.length === 0) {
      this.refresh();
    }
    return this.myProducts;
  }

  //add da se kaskadno dodaje da ne moramo ponovo kroz sve iterirati
  deleteProduct(product: Product): Observable<Response> {
    const observable = this.productService.deleteProduct(product);
    return observable;
  }

  updateProduct(oldValue: Product, newValue: Product): Observable<Response> {
    const observable = this.productService.updateProduct(oldValue, newValue);
    return observable;
  }

  addProduct(product: Product): Observable<Response> {
    const observable = this.productService.addProduct(product);
    return observable;
  }
}
