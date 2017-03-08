import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../../../../shared/product";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import { CategoryService } from "../../../../../product-page/category.service";
import { Category } from "../../../../../shared/category";

@Component({
  selector: 'dcws-my-products-item',
  templateUrl: './my-products-item.component.html',
  styleUrls: ['./my-products-item.component.css']
})
export class MyProductsItemComponent implements OnInit {

  @Input() product: Product;
  @Output() deleted: EventEmitter<Product> = new EventEmitter();
  @Output() updated: EventEmitter<{oldValue: Product, newValue: Product}> = new EventEmitter();

  //inicijalizacija
  newValue: Product = new Product();

  substringLength: number = 50;

  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  private pushAll(pushedFrom: string[]): string[] {
    let pushedTo: string[] = [];
    for(let categoryName of pushedFrom) {
      pushedTo.push(categoryName);
    }
    return pushedTo;
  }
  open(content) {
    //definitivno napraviti lijepši konstruktor
    this.newValue = new Product(
      this.product.id_product,
      this.product.title,
      this.product.description,
      this.product.price,
      this.product.availability,
      this.product.picture,
      this.product.email_seller,
      this.pushAll(this.product.categories)
    );
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  onDeleteProduct() {
    this.deleted.emit(this.product);
  }

  onUpdatedProduct(form: NgForm) {
    this.updated.emit({oldValue: this.product, newValue: this.newValue});
    this.modalRef.close();
  }

  getCategories(): Category[] {
    return this.categoryService.getCategories();
  }

  addCategory(categoryName: string) {
    let index = this.newValue.categories.findIndex(
      (category: string) => {
        if(category === categoryName) return true;
        return false;
      }
    );
    if(index === -1) {
      this.newValue.categories.push(categoryName);
    }
  }

  deleteThisCategory(categoryName: string) {
    let index = this.newValue.categories.findIndex(
      (name: string) => {
        if(name === categoryName) return true;
        return false;
      }
    );
    if(index !== -1) {
      this.newValue.categories.splice(index, 1);
    }
  }

}
