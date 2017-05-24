import {Component, OnInit, OnDestroy} from '@angular/core';
import {City} from "../shared/city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../shared/user";
import {ProfileService} from "../my-profile/profile.service";
import {CityService} from "../my-profile/city.service";
import {Subscription} from "rxjs";
import {createIdentifierToken} from "@angular/compiler/src/identifiers";
import {FlashMessagesService} from "angular2-flash-messages";
import {RouteResolver} from "../shared/routeResolver";
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  newUser: User;

  passwordAgain: string = "";

  currentCity: City;

  currentDate: NgbDateStruct;

  cities: City[];

  citiesSet: boolean = false;

  private citySubs: Subscription;

  private registerSubs: Subscription;

  constructor(private profileService: ProfileService,
              private cityService: CityService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService
  ) { }

  clicked(city: City) {
    this.currentCity = city;
  }

  ngOnInit() {
    this.newUser = User.createEmptyUser();
    if(this.cityService.citiesSet()) {
      this.cities = this.cityService.getAllCities();
      this.citiesSet = true;
    } else {
      this.getAllCities();
    }
    this.currentDate = this.profileService.initCurrentDate();
  }

  //namještanje kalendara
  getMinDate(): NgbDateStruct {
    return this.profileService.minDate;
  }
  getMaxDate(): NgbDateStruct {
    return this.profileService.maxDate;
  }
  getStartDate(): NgbDateStruct {
    return this.profileService.startDate;
  }

  //namještanje gradova
  getAllCities() {
    this.citySubs = this.cityService.fetchCities().subscribe(
      (response) => {
        this.cities = response;
        this.currentCity = this.cities[0];
        this.citiesSet = true;
      }
    );
  }

  registerBuyer(form: NgForm) {
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
    this.newUser.date_of_birth = new Date(Date.UTC(this.currentDate.year, this.currentDate.month - 1, this.currentDate.day));
    this.newUser.city = this.currentCity;
    this.registerSubs = this.profileService.registerBuyer(this.newUser).subscribe(
      response => {
          this.flashMessage.show('Registrirali ste se, poslan Vam je e-mail za potvrđivanje registracije',
          { cssClass: 'alert alert-success alert-message', timeout: 2000 });
          RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
      }
          ,
          error => this.flashMessage.show('Nažalost korisnik s ovom e-mail adresom već postoji',
            { cssClass: 'alert alert-danger alert-message', timeout: 2000 })

    );
  }

  ngOnDestroy(): void {
    if(this.registerSubs !== undefined){
      this.registerSubs.unsubscribe();
    }
    this.citySubs.unsubscribe();
  }

  check(): boolean {
    return this.newUser.password !== this.passwordAgain;
  }
}
