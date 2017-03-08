import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/category";
import {CategoryService} from "./category.service";

@Component({
  selector: 'dcws-left-product-menu',
  templateUrl: './left-product-menu.component.html',
  styleUrls: ['./left-product-menu.component.css']
})
export class LeftProductMenuComponent implements OnInit {

  isDropped: boolean = false;

  categories: Category[];

  changeState() {
    this.isDropped = !this.isDropped;
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

}
