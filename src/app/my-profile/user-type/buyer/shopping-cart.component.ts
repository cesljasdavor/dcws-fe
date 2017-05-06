import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable, Subscription} from "rxjs";
import {ShoppingItem} from "./shopping-item";
import {Router} from "@angular/router";
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'dcws-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  myCart: ShoppingItem[];

  private subscription: Subscription;

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.initCart();
  }

  buy() {
    this.subscription = this.shoppingCartService.buy().subscribe(
      response => {
        this.shoppingCartService.clearCart();
        //dodati message da je sve ok napravljeno i reroute
      }
    );
  }

  clear() {
    this.shoppingCartService.clearCart();
    this.initCart();
    //dodati reroute
    this.router.navigate(['/']);
  }

  initCart() {
    this.myCart = this.shoppingCartService.getAllShoppingItems();
  }

  ngOnDestroy(): void {
    if(this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
