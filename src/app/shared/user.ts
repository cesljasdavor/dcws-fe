import {City} from "./city";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class User {
  constructor(
    public id?: number,
    public email?: string,
    public email_admin?: string,
    public password?: string,
    public name?: string,
    public surname?: string,
    public telephone_number?: string,
    public address?: string,
    public city?: City,
    public privilege?: number, //0-Kupac,1-Prodavač, 2-Admin
    public date_of_birth?: Date
  ) {}

  dateOfBirth(): NgbDateStruct {
    return <NgbDateStruct>{year: this.date_of_birth.getFullYear(),
      month: this.date_of_birth.getMonth()+1,
      day: this.date_of_birth.getDate()
    };
  }
  /*
  1,
  "pero.peric@fer.hr",
  "davor.cesljas@fer.hr",
  "password",
  "Pero",
  "Perić",
  "0911986986",
  "Unska 3",
  new City("Zagreb", 10000),
  0,
  "1.3.1996"
  */
}
