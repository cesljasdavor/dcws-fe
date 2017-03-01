import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcws-left-product-menu',
  templateUrl: './left-product-menu.component.html',
  styleUrls: ['./left-product-menu.component.css']
})
export class LeftProductMenuComponent implements OnInit {

  isDropped: boolean = false;

  changeState() {
    this.isDropped = !this.isDropped;
  }

  constructor() { }

  ngOnInit() {
  }

}
