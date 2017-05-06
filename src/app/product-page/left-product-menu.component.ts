import {Component, OnInit, OnDestroy} from '@angular/core';
import {Category} from "../shared/category";
import {CategoryService} from "./category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'dcws-left-product-menu',
  templateUrl: './left-product-menu.component.html',
  styleUrls: ['./left-product-menu.component.css']
})
export class LeftProductMenuComponent implements OnInit, OnDestroy {

  isDropped: boolean = false;

  categories: Category[] = [];

  private categoriesSubs: Subscription;

  changeState() {
    this.isDropped = !this.isDropped;
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if(this.categoryService.categories.length !== 0) {
      this.categories = this.categoryService.categories;
      return;
    }

    this.categoriesSubs = this.categoryService.getCategories().map(response => response.json())
                              .subscribe(data => {
                                for(let category of data) {
                                  this.categories.push(category);
                                }
                              });
  }


  ngOnDestroy(): void {
    if(this.categoriesSubs !== undefined) {
      this.categoriesSubs.unsubscribe();
    }
  }
}
