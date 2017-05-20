import { Injectable } from '@angular/core';
import {Product} from "../../../shared/product";
import {Http, Response, Headers} from "@angular/http";
import {ProfileService} from "../../profile.service";
import {ProductService} from "../../../product-page/product.service";
import {Observable} from "rxjs";
import {Purchase} from "../../../shared/purchase";

@Injectable()
export class VendorService {

  myProducts:Product[] = [];

  myPurchases: Purchase[] = [];
  constructor(private http: Http,
              private profileService: ProfileService,
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

  //što sam prodao?
  getAllPurchases() {
    const vendorId = {id: this.profileService.myProfile.id};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const observable = this.http.post("http://localhost:3000/purchases/sold", JSON.stringify(vendorId), {headers: headers});
    observable.map(response => response.json()).subscribe(
      data => {
        for(let purchase of <Purchase[]> data) {
          purchase.created_at = Purchase.stringToDate(purchase.created_at);
          purchase.updated_at = Purchase.stringToDate(purchase.updated_at);

          this.myPurchases.push(purchase);
        }
      }
    );
  }

  requireAllPurchases() {
    if(this.myPurchases.length === 0) {
      this.getAllPurchases();
    }

    return this.myPurchases;
  }

  set_on_the_way(purchaseId: number): Observable<Response> {
    const purchaseJSON = {id: purchaseId};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post("http://localhost:3000/purchases/set_on_the_way", JSON.stringify(purchaseJSON), {headers: headers});

  }
}
