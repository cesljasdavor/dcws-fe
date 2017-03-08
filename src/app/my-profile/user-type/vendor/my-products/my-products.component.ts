import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../shared/product";
import {VendorService} from "../vendor.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteResolver} from "../../../../shared/routeResolver";
import {CategoryService} from "../../../../product-page/category.service";
import {ProfileService} from "../../../profile.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-my-products',
  templateUrl: 'my-products.component.html',
  styleUrls: ['my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  page: number = 1;

  //produkti ovisno o stranici
  pageProducts: Product[] = [];

  newProduct: Product = new Product(0,"","",0,true,null, this.profileService.myProfile.email, []);

  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal,
              private vendorService: VendorService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.changePage();
  }

  changePage() {
    this.pageProducts = this.vendorService.getPageProducts(this.page);
    //moja klasa
    RouteResolver.goToFragment(this.router, this.activatedRoute,"top-page");
  }

  //za pagination
  getSize(): number {
    return this.vendorService.getNumberOfProducts();
  }

  getPageSize(): number {
    return this.vendorService.pageSize;
  }

  onDeleteProduct(product: Product) {
    this.vendorService.deleteProduct(product);
    if(this.pageProducts.length === 1 && this.page > 1) {
      this.page--;
    }
    this.changePage();
  }

  onUpdateProduct(updates: {oldValue: Product, newValue: Product}) {
    this.vendorService.updateProduct(updates.oldValue, updates.newValue);
    this.changePage();
  }

  open(content) {
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  onAddProduct(form: NgForm) {
    this.vendorService.addProduct(this.newProduct);
    //nemoj zaboraviti izjednačiti ovo sa openom!
    this.modalRef.close();
    this.changePage();
    //mijenjaj referencu
    this.newProduct = new Product(0,"","",0,true,null, this.profileService.myProfile.email, []);
  }

  addCategory(categoryName: string) {
    let index = this.newProduct.categories.findIndex(
      (category: string) => {
        if(category === categoryName) return true;
        return false;
      }
    );
    if(index === -1) {
      this.newProduct.categories.push(categoryName);
    }
  }

  getCategories() {
    return this.categoryService.getCategories();
  }

  deleteThisCategory(categoryName: string) {
    let index = this.newProduct.categories.findIndex(
      (name: string) => {
        if(name === categoryName) return true;
        return false;
      }
    );
    if(index !== -1) {
      this.newProduct.categories.splice(index, 1);
    }
  }
}
