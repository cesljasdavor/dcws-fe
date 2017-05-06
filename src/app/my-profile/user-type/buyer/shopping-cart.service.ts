import { Injectable } from '@angular/core';
import { Product } from "../../../shared/product";
import { ShoppingItem } from "./shopping-item";
import {Http, Headers, Response} from "@angular/http";
import {Recepit} from "../../../shared/receipt";
import {Purchase} from "../../../shared/purchase";
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";

@Injectable()
export class ShoppingCartService {

  //inicijalizacija na prazno polje na početku
  myCart: ShoppingItem[] = [];

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
    const receipt: Recepit = this.create_receipt();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let observable = this.http.post("na web", JSON.stringify(receipt), {headers: headers});

    return observable;
  }

  //metoda koja će stvoriti račun ovdje
  create_receipt(): Recepit {
    let purchases: Purchase[] = [];
    for(let shi of this.myCart) {
      purchases.push(new Purchase(this.profileService.myProfile.id,
                                  shi.product.id_product,
                                  shi.amount,
                                  shi.product.price,
                                  false));
    }

    return new Recepit(purchases);
  }
}
