import { Component, OnInit } from '@angular/core';
import {ProfileService} from "./profile.service";

@Component({
  selector: 'dcws-left-my-profile-menu',
  templateUrl: './left-my-profile-menu.component.html',
  styleUrls: ['./left-my-profile-menu.component.css']
})
export class LeftMyProfileMenuComponent implements OnInit {

  isDropped: boolean = true;

  privilege: number;

  changeState() {
    this.isDropped = !this.isDropped;
  }
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.privilege = this.profileService.getPrivilege();
  }

}
