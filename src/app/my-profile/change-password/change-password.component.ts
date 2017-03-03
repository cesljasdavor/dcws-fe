import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {City} from "../../shared/city";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPassword: string;

  //dummy user
  user: User = new User(
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
    new Date("2000-3-1")
  );

  constructor() { }

  ngOnInit() {
  }

}
