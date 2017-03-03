import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../my-profile/profile.service";

@Component({
  selector: 'dcws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  privilege: number;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loggedIn = this.profileService.isLoggedIn();
    this.changePrivilege();
  }

  logout() {
    this.profileService.logout();
    this.loggedIn = this.profileService.isLoggedIn();
    this.changePrivilege();
  }

  changePrivilege() {
    if(this.loggedIn) {
      //0-Kupac,1-Prodavač, 2-Admin
      this.privilege = this.profileService.getPrivilege();
    } else {
      this.privilege = -1;
    }
  }

}
