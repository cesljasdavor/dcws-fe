import { Injectable } from '@angular/core';
import { City } from "../shared/city";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class CityService {

  //gradovi su oično konstantni pa ćemo samo puniti polje
  private cities: City[] = [];

  constructor(private http: Http) { }

  citiesSet(): boolean {
    return this.cities === undefined;
  }

  fetchCities(): Observable<City[]> {
    const observable = this.http.get("http://localhost:3000/cities/all_cities.json")
      .map((response: Response) => response.json());
    observable.subscribe(
        data => {
          //kako bi referenca ostala ista
         this.cities = <City[]> data;
      }
    );
    return observable
  }

  getAllCities(): City[] {
    return this.cities;
  }

}
