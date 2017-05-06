import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../shared/category";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription, Observable} from "rxjs";
import {CategoryService} from "../../../../product-page/category.service"

@Component({
  selector: 'app-editing-categories',
  templateUrl: './editing-categories.component.html',
  styleUrls: ['./editing-categories.component.css']
})
export class EditingCategoriesComponent implements OnInit {
  categories: Category[] = [];

  modalRef: NgbModalRef;

  // koristi se prilikom update/new
  category: Category;

  searched: string = "";

  private delSubs: Subscription;
  private updateSubs: Subscription;
  private createSubs: Subscription;

  constructor(private modalService: NgbModal,
              private categoryService: CategoryService
  ) { }


  ngOnInit() {
    this.categories = this.categoryService.requireCategories();
  }

  openToCreate(content) {
    this.category = new Category("","", 0);
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }


  openToUpdate(content, toUpdate: Category) {
    this.category = Category.createSameCategory(toUpdate);
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  addCategory() {
    this.createSubs = this.categoryService.addCategory(this.category)
      .map(response => response.json()).subscribe(
      data => {
        //programsko gašenje modala
        this.modalRef.close();

        //daj mi id koji je dobila kategorija
        this.category.id = data.id;
        //promjenu napravi i u servis
        this.categoryService.categories.push(this.category);
      },
      error => console.log("Nisam uspio stvoriti kategoriju na serveru!")
    );

  }

  updateCategory(oldValueID: number) {
    //ovo bi uvijek trebalo pronaći kategoriju
    let oldValue = this.categories.find((c:Category) => c.id === oldValueID);

    this.updateSubs = this.categoryService.updateCategory(oldValue, this.category).subscribe(
      response => {
        //programsko gašenje modala
        this.modalRef.close();

        //promjena u servisu
        let index = this.categoryService.categories.findIndex(
          (c: Category) => c===oldValue);
        this.categoryService.categories.splice(index,1,this.category);
      },
      error => console.log("Nisam uspio izmjeniti kategoriju")
    );

  }

  deleteCategory(toDelete: Category) {
    this.delSubs = this.categoryService.deleteCategory(toDelete).subscribe(
      response => {
        //izbriši iz servisa da ne bi ponovo slao na server
        let index = this.categoryService.categories.findIndex(
          (c: Category) => c===toDelete);
        this.categoryService.categories.splice(index,1);
      },
      error => console.log("Nisam uspio izbrisati")
    );
  }

  ngOnDestroy(): void {
    if(this.delSubs !== undefined) {
      this.delSubs.unsubscribe()
    }

    if(this.updateSubs !== undefined) {
      this.updateSubs.unsubscribe()
    }

    if(this.createSubs !== undefined) {
      this.createSubs.unsubscribe()
    }
  }

}
