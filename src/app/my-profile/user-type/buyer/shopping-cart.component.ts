import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../profile.service";
import {Observable} from "rxjs";
import {ShoppingItem} from "./shopping-item";
import {Router} from "@angular/router";

@Component({
  selector: 'dcws-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  myCart: ShoppingItem[];
  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.initCart();
  }

  buy() {
    //tu će ići poziv za http vezu i nakon toga neka poruka
  }

  clear() {
    this.profileService.clear();
    this.initCart();
    this.router.navigate(['/']);
  }

  initCart() {
    this.myCart = this.profileService.getShoppingCart();
  }

}
