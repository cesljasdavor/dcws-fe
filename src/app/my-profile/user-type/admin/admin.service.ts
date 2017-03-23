import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "../../../shared/user";
import {City} from "../../../shared/city";

@Injectable()
export class AdminService {

  pageSize: number = 2;

   buyers: User[] = [];
  //   new User(
  //     1,
  //     "ivo.ivic@fer.hr",
  //     "davor.cesljas@fer.hr",
  //     "password",
  //     "Ivo",
  //     "Ivić",
  //     "0911986986",
  //     "Magazinska 3",
  //     new City(3,"Split", 23000),
  //     0,
  //     new Date("2000-6-25")
  //   ),
  //   new User(
  //     1,
  //     "pero.peric@fer.hr",
  //     "davor.cesljas@fer.hr",
  //     "password",
  //     "Pero",
  //     "Perić",
  //     "0911986986",
  //     "Unska 3",
  //     new City(1,"Zagreb", 10000),
  //     0,
  //     new Date("2000-3-1")
  //   ),
  //   new User(
  //     1,
  //     "tomislav.cesljas@grad.hr",
  //     "davor.cesljas@fer.hr",
  //     "password",
  //     "Tomislav",
  //     "Češljaš",
  //     "0911986986",
  //     "Marina Tartaglie 12",
  //     new City(1,"Zagreb", 10000),
  //     0,
  //     new Date("2000-7-11")
  //   )

  myVendors: User[] = [];
  //   [
  //   new User(
  //     1,
  //     "stipe.stipic@zadar.hr",
  //     "davor.cesljas@fer.hr",
  //     "password",
  //     "Stipe",
  //     "Stipić",
  //     "098194555",
  //     "Kalelarga 25",
  //     new City(2,"Zadar", 21000),
  //     1,
  //     new Date("2000-7-31")
  //   ),
  //   new User(
  //     1,
  //     "karlo.karlovic@sibenik.hr",
  //     "davor.cesljas@fer.hr",
  //     "password",
  //     "Karlo",
  //     "Karlović",
  //     "0911986986",
  //     "Zagrebačka 23",
  //     new City(4,"Šibenik", 22000),
  //     1,
  //     new Date("2000-3-17")
  //   ),
  //
  // ];

  //Riješiti problem anomalije na zadnjem pageu moguće da nešto ne valja jer dupliciraš reference
  constructor(private http: Http) {}

  deleteUser(user: User) {
    //prvo http veza, a onda i brisanje iz polja ako je veza uspjela

    let users: User[];

    if(user.privilege === 0) {
      users = this.buyers;
    } else if(user.privilege === 1) {
      users = this.myVendors;
    } else {
      return;
    }

    let index = users.findIndex(
      (u: User) => {
        if(u===user) return true;
        return false;
      });
    users.splice(index,1);
  }

  createVendor(vendor: User) {
    //prvo šalje usera na server a potom dodaje i ovdje ukoliko je bio uspješan
    this.myVendors.push(vendor);
  }

  getMyVendors(): User[] {
    //dohvati moje vendore
    return this.myVendors;
  }

  getBuyers(): User[] {
    //dohvati sve ili dio usera, nisam još odlučio
    return this.buyers
  }

  getNumberOfUsers(privilege: number): number {
    if(privilege === 0) {
      return this.buyers.length;
    }
    return this.myVendors.length;
  }

  getPageUsers(page: number, privilege: number): User[] {
    let users: User[];
    if(privilege === 0) {
      users = this.buyers;
    } else {
      users = this.myVendors;
    }

    let pageUsers = [];
    //ubaci one elemente koji su na ovim indeksima
    for(let i=((page-1)*this.pageSize); i<((page)*this.pageSize) && i < users.length; i++){
      pageUsers.push(users[i]);
    }

    return pageUsers;
  }

}
