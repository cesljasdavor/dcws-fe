import { Injectable } from '@angular/core';
import { City } from "../shared/city";
import { Http } from "@angular/http";

@Injectable()
export class CityService {

  cities: City[] = [new City("Zagreb",10000),
    new City("Osijek",54000),
    new City("Split",23000),
    new City("Zadar",21000),
    new City("Šibenik",22000)
  ];

  constructor(private http: Http) { }

  getAllCities(): City[] {
    return this.cities;
  }

}
