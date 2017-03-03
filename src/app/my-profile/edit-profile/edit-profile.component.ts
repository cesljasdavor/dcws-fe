import { Component, OnInit } from '@angular/core';
import {City} from "../../shared/city";
import {User} from "../../shared/user";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'dcws-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentDate: NgbDateStruct;

  currentCity: City;

  myProfile: User;

  constructor(private profileService: ProfileService) { }

  clicked(city: City) {
    this.currentCity = city;
  }

  ngOnInit() {
    this.currentCity = this.profileService.initCurrentCity();
    this.currentDate= this.profileService.initCurrentDate();
    //inicijalizacija
    //dakle promjenom valuea u formi ovaj myprofile se neće promijeniti
    //tek će se prilikom submita ov namjestiti
    this.myProfile = this.profileService.myProfile;
  }

  //namještanje kalendara
  getMinDate(): NgbDateStruct {
    return this.profileService.minDate;
  }
  getMaxDate(): NgbDateStruct {
    return this.profileService.maxDate;
  }

  //namještanje gradova
  getAllCities(): City[] {
    return this.profileService.getAllCities();
  }

}
