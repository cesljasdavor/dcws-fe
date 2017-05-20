import { Injectable } from '@angular/core';
import { Product } from "../../../shared/product";
import { ShoppingItem } from "./shopping-item";
import {Http, Headers, Response} from "@angular/http";
import {Receipt} from "../../../shared/receipt";
import {Purchase} from "../../../shared/purchase";
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";

@Injectable()
export class BuyerService {

  //inicijalizacija na prazno polje na početku
  myCart: ShoppingItem[] = [];

  myPurchases: Purchase[] = [];

  constructor(
    private http: Http,
    private profileService: ProfileService
  ) { }

  getAllShoppingItems(): ShoppingItem[] {
    return this.myCart;
  }

  addToCart(product: Product) {
    //pronađi element ako postoji
    let shoppingItem = this.myCart.find(
      (shi: ShoppingItem)=> {
        return shi.product===product;
    });

    //po defaultu amount je 1
    if(shoppingItem === undefined) this.myCart.push(new ShoppingItem(product));
    else shoppingItem.amount++;
  }

  removeFromCart(shoppingItem: ShoppingItem) {
    let removeIndex = this.myCart.findIndex(
      (shi: ShoppingItem) => {
        return shi===shoppingItem;
    });
    //removanje
    this.myCart.splice(removeIndex,1);
  }

  //kada se obavi kupnja
  clearCart() {
    this.myCart = [];
  }

  //metoda koja će stvoriti račun na serveru
  buy(): Observable<Response> {
    const receipt: Receipt = this.create_receipt();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let observable = this.http.post("http://localhost:3000/receipts/buy", JSON.stringify(receipt), {headers: headers});

    return observable;
  }

  //metoda koja će stvoriti račun ovdje
  create_receipt(): Receipt {
    let purchases: Purchase[] = [];
    for(let shi of this.myCart) {
      purchases.push(Purchase.fromShoppingItem(shi, this.profileService.myProfile));
    }

    return new Receipt(purchases);
  }

  getAllPurchases() {
    const buyerId = {id: this.profileService.myProfile.id};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const observable = this.http.post("http://localhost:3000/purchases/bought", JSON.stringify(buyerId), {headers: headers});
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

}
