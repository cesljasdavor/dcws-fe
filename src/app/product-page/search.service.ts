import { Injectable } from '@angular/core';
import {Category} from "../shared/category";
import {Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class SearchService {

  searchedText: string = "";
  private searchTextSubject: BehaviorSubject<string>;

  searchedCategory: Category = null;
  private searchCategorySubject: BehaviorSubject<Category>;

  constructor() { }

  observeSearchText(): Observable<string> {
    this.searchTextSubject = new BehaviorSubject(this.searchedText);
    return this.searchTextSubject.asObservable();
  }

  fireSearchTextChange(newText: string) {
    this.searchedText = newText;
    this.searchTextSubject.next(newText);
  }

  observeSearchCategory(): Observable<Category> {
    this.searchCategorySubject = new BehaviorSubject(this.searchedCategory);
    return this.searchCategorySubject.asObservable();
  }

  fireSearchCategoryChange(newCategory: Category) {
    this.searchedCategory = newCategory;
    this.searchCategorySubject.next(newCategory);
  }

  reset() {
    this.searchedText = "";
    this.searchedCategory = null;
    this.searchTextSubject.next(this.searchedText);
    this.searchCategorySubject.next(this.searchedCategory);
  }

}
