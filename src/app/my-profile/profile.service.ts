import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../shared/user";
import {City} from "../shared/city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CityService} from "./city.service";
import {ShoppingCartService} from "./user-type/buyer/shopping-cart.service";
import {Observable, Subject, Subscription} from "rxjs";

@Injectable()
export class ProfileService {

  //koristi se za settanje maxdatea
  now: Date = new Date();

  startDate: NgbDateStruct = {year: 1970, month: 1, day:1};

  minDate: NgbDateStruct = {year: 1900, month: 1, day: 1};

  maxDate: NgbDateStruct = {year: this.now.getFullYear(), month: this.now.getMonth()+1, day: this.now.getDate()};

  private emmitLogin: Subject<boolean> = new Subject();
  //dummy user
  myProfile: User;

  private loginSubs: Subscription;

  //cityService za registraciju i editanje profila shoppingCartService samo za kupca prilikom kupovine
  constructor(private http: Http, private cityService: CityService, private shoppingCartService: ShoppingCartService) { }


  initCurrentDate(): NgbDateStruct {
    if(this.myProfile) {
      return User.dateForDisplay(this.myProfile.date_of_birth);
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
    const emailData = {email: this.myProfile.email};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/users/logout.json", JSON.stringify(emailData), {headers: headers});
    this.loginSubs = observable.map((data: Response) => data.json())
      .catch(error => error.json())
      .subscribe(
        ((response: {user: User}) => {
          this.emmitLogin.next(false);
          this.myProfile = null;
        })
      );
  }


  login(email: string, password: string): Observable<Response> {
    //dummy login dio sa loginom će se obaviti na serveru
    let userData = {email: email, password: password};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/users/login.json", JSON.stringify(userData), {headers: headers});
    this.loginSubs = observable.map((data: Response) => data.json())
      .catch(error => error.json())
      .subscribe(
      ((response: {user: User}) => {
        //jer se neće stvorti sam od sebe
        response.user.date_of_birth = new Date(response.user.date_of_birth);
        this.myProfile = <User> response.user;
        console.log(this.myProfile.date_of_birth.getUTCDate());
        this.emmitLogin.next(true);
      })
    );
    return observable;
  }

  //register
  registerBuyer(user: User): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/users/register_buyer", JSON.stringify(user), {headers: headers});
    return observable;
  }

  registerVendor(newVendor: User) {
    //tu ide nekakva implementacija koju trebaš prije svega definirati na serveru
    console.log(newVendor)
  }

  //edit user
  editUser(editedProfile: User): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let observable = this.http.post("http://localhost:3000/users/edit_user_data", JSON.stringify(editedProfile), {headers: headers});
    return observable;
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
