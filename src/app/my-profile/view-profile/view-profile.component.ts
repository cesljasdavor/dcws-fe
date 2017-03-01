import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {City} from "../../shared/city";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

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
    "1.3.1996"
  )
  constructor() { }

  ngOnInit() {
  }

}
