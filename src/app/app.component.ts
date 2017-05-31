import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./my-profile/profile.service";

@Component({
  selector: 'dcws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.loginFromLocalStorage();
  }
}
