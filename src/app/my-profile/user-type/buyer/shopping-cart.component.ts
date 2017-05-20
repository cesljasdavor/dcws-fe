import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable, Subscription} from "rxjs";
import {ShoppingItem} from "./shopping-item";
import {Router} from "@angular/router";
import {BuyerService} from "./buyer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {RouteResolver} from "../../../shared/routeResolver";

@Component({
  selector: 'dcws-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  myCart: ShoppingItem[];

  private subscription: Subscription;

  constructor(private router: Router,
              private shoppingCartService: BuyerService,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.initCart();
  }

  buy() {
    this.subscription = this.shoppingCartService.buy().subscribe(
      response => {
        this.shoppingCartService.clearCart();
        this.clear();

        this.flashMessage.show(
          'Uspješno ste kupili sve proizvode u košarici.\n'+
          'Status kupljenih proizvoda možete vidjeti klikom na karticu >Što sam kupio?<',
          { cssClass: 'alert alert-info alert-message', timeout: 3000 });
      },
      error => {
        this.flashMessage.show(
          'Vaša kupnja nije uspješno provedena. Molim Vas da pokušate ponovo',
          { cssClass: 'alert alert-danger alert-message', timeout: 2000 });
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
