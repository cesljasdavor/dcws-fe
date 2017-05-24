import {Component, OnInit, OnDestroy} from '@angular/core';
import {City} from "../../shared/city";
import {User} from "../../shared/user";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../profile.service";
import {CityService} from "../city.service";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {RouteResolver} from "../../shared/routeResolver";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'dcws-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  currentDate: NgbDateStruct;

  editedProfile: User;

  cities: City[];

  citiesSet: boolean = false;

  private citySubs: Subscription;

  private editSubs: Subscription;

  constructor(private profileService: ProfileService,
              private cityService: CityService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService
  ) { }

  clicked(city: City) {
    this.editedProfile.city = city;
  }

  ngOnInit() {
    this.editedProfile = User.createSameUser(this.profileService.myProfile);
    if(this.cityService.citiesSet()) {
      this.cities = this.cityService.getAllCities();
      this.citiesSet = true;
    } else {
      this.getAllCities();
    }
    this.currentDate= this.profileService.initCurrentDate();
  }

  //namještanje kalendara
  getMinDate(): NgbDateStruct {
    return this.profileService.minDate;
  }
  getMaxDate(): NgbDateStruct {
    return this.profileService.maxDate;
  }

  //namještanje gradova
  getAllCities() {
    this.citySubs = this.cityService.fetchCities().subscribe(
      (response) => {
        this.cities = response;
        this.citiesSet = true;
      }
    );
  }

  updateProfile(form: NgForm) {
    this.editedProfile.date_of_birth = new Date(Date.UTC(this.currentDate.year, this.currentDate.month - 1, this.currentDate.day));
    console.log(JSON.stringify(this.editedProfile.date_of_birth));
    this.editSubs = this.profileService.editUser(this.editedProfile).subscribe(
      response => {
        this.flashMessage.show('Vaš profil je izmijenjen',
          { cssClass: 'alert alert-success alert-message', timeout: 2000 });
        this.profileService.myProfile = this.editedProfile;
        RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
      }
      , error => {
        this.flashMessage.show('Nažalost korisnik s ovom e-mail adresom već postoji',
          { cssClass: 'alert alert-danger alert-message', timeout: 2000 });
          RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
      }
    );
  }

  isChanged(): boolean {
    return this.editedProfile !== this.profileService.myProfile;
  }


  ngOnDestroy(): void {
    if(this.editSubs !== undefined) {
      this.editSubs.unsubscribe();
    }
    this.citySubs.unsubscribe();
  }

}
