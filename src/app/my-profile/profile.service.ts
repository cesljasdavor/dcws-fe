import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {User} from "../shared/user";
import {City} from "../shared/city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CityService} from "./city.service";
import {ShoppingCartService} from "./user-type/buyer/shopping-cart.service";
import {Product} from "../shared/product";
import {ShoppingItem} from "./user-type/buyer/shopping-item";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ProfileService {

  //koristi se za settanje maxdatea
  now: Date = new Date();

  startDate: NgbDateStruct = {year: 1970, month: 1, day:1};

  minDate: NgbDateStruct = {year: 1900, month: 1, day: 1};

  maxDate: NgbDateStruct = {year: this.now.getFullYear(), month: this.now.getMonth()+1, day: this.now.getDate()};

  private emmitLogin: Subject<boolean> = new Subject();
  //dummy user
  myProfile: User; /*= new User(
    1,
    "pero.peric@fer.hr",
    "davor.cesljas@fer.hr",
    "password",
    "Pero",
    "Perić",
    "0911986986",
    "Unska 3",
    new City("Zagreb", 10000),
    1,
    new Date("2000-3-1")
  );*/

  //dummy
  possibleUser: User = new User(
    1,
    "pero.peric@fer.hr",
    "davor.cesljas@fer.hr",
    "password",
    "Pero",
    "Perić",
    "0911986986",
    "Unska 3",
    new City("Zagreb", 10000),
    1,
    new Date("2000-3-1")
  );

  //cityService za registraciju i editanje profila shoppingCartService samo za kupca prilikom kupovine
  constructor(private http: Http, private cityService: CityService, private shoppingCartService: ShoppingCartService) { }

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

  observeLogin(): Observable<boolean> {
    return this.emmitLogin.asObservable();
  }

  //0-Kupac,1-Prodavač, 2-Admin
  getPrivilege(): number {
    if(this.myProfile) {
      return this.myProfile.privilege;
    }
    return -1;
  }

  logout() {
    //+ azuriranje na serveru
    this.emmitLogin.next(false);
    this.myProfile = null;
  }

  login(email: string, password: string): number {
    //dummy login dio sa loginom će se obaviti na serveru

    if(email !== this.possibleUser.email) {
      return 0;

    } else if(password !== this.possibleUser.password){
      return 1; //-1 znači krivi password

    } else {
      this.myProfile = this.possibleUser;
      //prvo mijenjaj ono kaj mijenja privilege...
      this.emmitLogin.next(true);
      return 2;
    }
  }

  //register
  registerBuyer(newBuyer: User) {
    //tu ide nekakva implementacija koju trebaš prije svega definirati na serveru
    console.log(newBuyer)
  }

  registerVendor(newVendor: User) {
    //tu ide nekakva implementacija koju trebaš prije svega definirati na serveru
    console.log(newVendor)
  }

  //edit user
  editUser(editedProfile: User) {
    //pošalji na server i ak je sve ok zamijeni reference
    this.myProfile = editedProfile;
  }

  changePassword(currentPassword: string, newPassword: string): boolean {
    if(currentPassword === this.myProfile.password) {
      //poziv na server izmjena u bazi
      this.myProfile.password = newPassword;
      return true;
    }
    return false;
  }

}
