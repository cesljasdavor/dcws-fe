import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../shared/category";
import {CategoryService} from "../../../../product-page/category.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteResolver} from "../../../../shared/routeResolver";

@Component({
  selector: 'app-inspect-categories',
  templateUrl: './inspect-categories.component.html',
  styleUrls: ['./inspect-categories.component.css']
})
export class InspectCategoriesComponent implements OnInit {

  page: number = 1;

  pageCategories: Category[] = [];

  modalRef: NgbModalRef;

  newCategory: Category;

  constructor(private modalService: NgbModal,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  changePage() {
    //opet predajemo privilegiju 1
    this.pageCategories = this.categoryService.getPageCategories(this.page);
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
  }

  ngOnInit() {
    this.changePage();
    this.newCategory = new Category("","");
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  addCategory(form: NgForm) {
    this.categoryService.addCategory(this.newCategory);
    //programsko gašenje modala
    this.modalRef.close();
    this.changePage();
    //mijenjaj referencu
    this.newCategory = new Category("","");
  }

  onUpdateCategory(updates:{oldValue: Category, newValue: Category}) {
    this.categoryService.updateCategory(updates.oldValue, updates.newValue);
    this.changePage();
  }

  onDeleteCategory(category: Category) {
    this.categoryService.deleteCategory(category);

    if(this.pageCategories.length === 1 && this.page > 1) {
      this.page--;
    }
    this.changePage();
  }

  //za pagination
  getSize(): number {
    //0 jer je privilegija 0
    return this.categoryService.getNumberOfCategories();
  }

  getPageSize(): number {
    return this.categoryService.pageSize;
  }

}
