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

  static createSameUser(user: User): User {
    return new User(
      user.id,
      user.email,
      user.email_admin,
      user.password,
      user.name,
      user.surname,
      user.telephone_number,
      user.address,
      City.createSameCity(user.city),
      user.privilege,
      new Date(user.date_of_birth.toString())
    );
  }

  static createEmptyUser(): User {
    return new User(
      0,
      "",
      null,
      "",
      "",
      "",
      "",
      "",
      null,
      0,
      null
    );
  }

  static dateForDisplay(date: Date): NgbDateStruct {
    return <NgbDateStruct>{year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate()
    };
  }
}
