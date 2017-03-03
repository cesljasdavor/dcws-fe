import { Component, OnInit } from '@angular/core';
import {City} from "../shared/city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../shared/user";
import {ProfileService} from "../my-profile/profile.service";
import {CityService} from "../my-profile/city.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User;

  currentCity: City;

  currentDate: NgbDateStruct;

  constructor(private profileService: ProfileService) { }

  clicked(city: City) {
    this.currentCity = city;
  }

  ngOnInit() {
    this.currentCity = this.profileService.initCurrentCity();
    this.currentDate= this.profileService.initCurrentDate();
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
  getAllCities(): City[] {
    return this.profileService.getAllCities();
  }
}
