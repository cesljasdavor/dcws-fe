import { Injectable } from '@angular/core';
import { Product } from "../../../shared/product";
import { ShoppingItem } from "./shopping-item";
import {Http} from "@angular/http";

@Injectable()
export class ShoppingCartService {

  //inicijalizacija na prazno polje na početku
  myCart: ShoppingItem[] = [];

  constructor(private http: Http) { }

  getAllShoppingItems(): ShoppingItem[] {
    return this.myCart;
  }

  addProduct(product: Product) {
    //pronađi element ako postoji
    let shoppingItem = this.myCart.find(
      (shi: ShoppingItem)=> {
        if(shi.product===product) return true;
        return false;
    });

    //po defaultu amount je 1
    if(shoppingItem === undefined) this.myCart.push(new ShoppingItem(product));
    else shoppingItem.amount++;
  }

  removeProduct(shoppingItem: ShoppingItem) {
    let removeIndex = this.myCart.findIndex(
      (shi: ShoppingItem) => {
        if(shi===shoppingItem) return true;
        return false;
    });
    //removanje
    this.myCart.splice(removeIndex,1);
  }

  //kada se obavi kupnja
  clearCart() {
    this.myCart = [];
  }

  //metoda koja će stvoriti račun na serveru
  //buy()

}
