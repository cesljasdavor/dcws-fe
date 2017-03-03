import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {User} from "../shared/user";
import {City} from "../shared/city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CityService} from "./city.service";
import {ShoppingCartService} from "./user-type/buyer/shopping-cart.service";
import {Product} from "../shared/product";
import {ShoppingItem} from "./user-type/buyer/shopping-item";

@Injectable()
export class ProfileService {

  //koristi se za settanje maxdatea
  now: Date = new Date();

  startDate: NgbDateStruct = {year: 1970, month: 1, day:1};

  minDate: NgbDateStruct = {year: 1900, month: 1, day: 1};

  maxDate: NgbDateStruct = {year: this.now.getFullYear(), month: this.now.getMonth()+1, day: this.now.getDate()};

  //dummy user
  myProfile: User = new User(
    1,
    "pero.peric@fer.hr",
    "davor.cesljas@fer.hr",
    "password",
    "Pero",
    "Perić",
    "0911986986",
    "Unska 3",
    new City("Zagreb", 10000),
    0,
    new Date("2000-3-1")
  );

  //cityService za registraciju i editanje profila shoppingCartService samo za kupca prilikom kupovine
  constructor(private http: Http, private cityService: CityService, private shoppingCartService: ShoppingCartService) { }


  getAllCities(): City[] {
    return this.cityService.getAllCities();
  }

  initCurrentCity(): City {
    if(this.myProfile) {
      return this.myProfile.city;
    }
    return this.cityService.getAllCities()[0];
  }

  initCurrentDate(): NgbDateStruct {
    if(this.myProfile) {
      return this.myProfile.dateOfBirth();
    }
    return {year: 1970, month: 1, day:1};
  }

  isLoggedIn(): boolean {
    if(this.myProfile) {
      return true;
    }
    return false;
  }

  //0-Kupac,1-Prodavač, 2-Admin
  getPrivilege(): number {
    if(this.myProfile) {
      return this.myProfile.privilege;
    }
    return -1;
  }

  logout() {
    this.myProfile = null;
  }

  addToCart(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  removeFromCart(shoppingItem: ShoppingItem) {
    this.shoppingCartService.removeProduct(shoppingItem);
  }

  getShoppingCart(): ShoppingItem[]  {
    return this.shoppingCartService.getAllShoppingItems();
  }

  clear() {
    this.shoppingCartService.clearCart();
  }
}
