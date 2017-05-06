import { Component, OnInit } from '@angular/core';
import {UserView} from "../userView";
import {User} from "../../../../shared/user";
import {NgbModalRef, NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {City} from "../../../../shared/city";
import {Subscription} from "rxjs";
import {AdminService} from "../admin.service";
import {Router, ActivatedRoute} from "@angular/router";
import {CityService} from "../../../city.service";
import {ProfileService} from "../../../profile.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {RouteResolver} from "../../../../shared/routeResolver";

@Component({
  selector: 'app-my-vendors-inspection',
  templateUrl: './my-vendors-inspection.component.html',
  styleUrls: ['./my-vendors-inspection.component.css']
})
export class MyVendorsInspectionComponent implements OnInit {

  myVendors: UserView[] = [];

  //za pretragu po imenu i prezimenu
  searched: string = "";

  //koristi se prilikom prikaza korisnika
  show: UserView;

  //koriste se prilikom registracije novog prodavača
  newVendor: User;

  private newVendorModal: NgbModalRef;

  currentCity: City;

  currentDate: NgbDateStruct;

  cities: City[];

  citiesSet: boolean = false;

  private citySubs: Subscription;

  private registerSubs: Subscription;

  private deleteSubs: Subscription;

  constructor(private adminService: AdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private cityService: CityService,
              private profileService: ProfileService,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.myVendors = this.adminService.requireMyVendors();
  }

  deleteUser(user: UserView) {
    this.deleteSubs = this.adminService.deleteUser(user).subscribe(
      response => {
        let index = this.adminService.myVendors.findIndex(
          (u: UserView) => u===user);
        this.adminService.myVendors.splice(index,1);

      },
      error => console.log("Ne mogu obrisati kupca!")
    );
  }

  openToInspect(content, userView: UserView) {
    this.show = userView;
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

//daljnje metode osim OnDelete koriste se isključivo ukoliko se pritisne na izradu novog vendora
  openToCreate(content) {
    this.newVendor = User.createEmptyUser();
    if(this.cityService.citiesSet()) {
      this.cities = this.cityService.getAllCities();
      this.citiesSet = true;
    } else {
      this.getAllCities();
    }
    this.currentDate = this.profileService.initCurrentDate();
    this.newVendorModal = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  createVendor() {
    this.newVendor.date_of_birth = new Date(this.currentDate.year, this.currentDate.month, this.currentDate.day);
    this.newVendor.city = this.currentCity;
    this.newVendor.email_admin = this.profileService.myProfile.email;
    //privilegija za prodavača
    this.newVendor.privilege = 1;

    this.registerSubs = this.profileService.registerVendor(this.newVendor)
      .map(response => response.json())
      .subscribe(
        data => {
          this.flashMessage.show("Registrirali ste prodavača '" + this.newVendor.name + " " + this.newVendor.surname + "'",
            { cssClass: 'alert alert-success alert-message', timeout: 2000 });

          //čistim sve trenutne prodavače kako bi dobio nove na refresh
          this.adminService.myVendors.splice(0, this.adminService.myVendors.length);
          //daj mi sada novu listu svih prodavača
          this.refresh();
          this.newVendorModal.close();
          RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
        }
        ,
        error => {
          this.flashMessage.show('Nažalost korisnik s ovom e-mail adresom već postoji',
            {cssClass: 'alert alert-danger alert-message', timeout: 2000});
          this.newVendor = User.createEmptyUser();
        }

    );
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

  //namještanje pritisnutog grada
  clicked(city: City) {
    this.currentCity = city;
  }

  ngOnDestroy(): void {
    if(this.citySubs !== undefined ) {
      this.citySubs.unsubscribe();
    }

    if(this.registerSubs !== undefined) {
      this.registerSubs.unsubscribe();
    }

    if(this.deleteSubs !== undefined) {
      this.deleteSubs.unsubscribe();
    }
  }
}
