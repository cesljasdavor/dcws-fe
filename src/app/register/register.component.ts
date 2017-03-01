import { Component, OnInit } from '@angular/core';
import {City} from "../shared/city";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentCity: City;

  cities: City[] = [new City("Zagreb",10000),
                    new City("Osijek",54000),
                    new City("Split",23000),
                    new City("Zadar",21000),
                    new City("Šibenik",22000)
  ];

  constructor() { }

  clicked(city: City) {
    this.currentCity = city;
  }

  ngOnInit() {
    this.currentCity = this.cities[0];
  }

}
