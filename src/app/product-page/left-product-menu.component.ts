import {Component, OnInit, OnDestroy} from '@angular/core';
import {Category} from "../shared/category";
import {CategoryService} from "./category.service";
import {Subscription} from "rxjs";
import {SearchService} from "./search.service";

@Component({
  selector: 'dcws-left-product-menu',
  templateUrl: './left-product-menu.component.html',
  styleUrls: ['./left-product-menu.component.css']
})
export class LeftProductMenuComponent implements OnInit, OnDestroy {

  isDropped: boolean = false;

  categories: Category[] = [];

  changeState() {
    this.isDropped = !this.isDropped;
  }

  constructor(private categoryService: CategoryService,
              private searchService: SearchService) { }

  ngOnInit() {
    if(this.categoryService.categories.length !== 0) {
      this.categories = this.categoryService.categories;
      return;
    }

    this.categories = this.categoryService.requireCategories();
  }

  changeSearchedCategory(category: Category) {
    this.searchService.fireSearchCategoryChange(category);
  }

  ngOnDestroy(): void {
  }
}
