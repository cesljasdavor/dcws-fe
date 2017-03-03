import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {City} from "../../shared/city";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {


  myProfile: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.myProfile = this.profileService.myProfile;
  }

}
