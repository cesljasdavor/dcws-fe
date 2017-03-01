import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcws-left-my-profile-menu',
  templateUrl: './left-my-profile-menu.component.html',
  styleUrls: ['./left-my-profile-menu.component.css']
})
export class LeftMyProfileMenuComponent implements OnInit {

  isDropped: boolean = true;

  changeState() {
    this.isDropped = !this.isDropped;
  }
  constructor() { }

  ngOnInit() {
  }

}
