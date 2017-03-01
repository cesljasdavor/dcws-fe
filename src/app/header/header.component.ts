import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
