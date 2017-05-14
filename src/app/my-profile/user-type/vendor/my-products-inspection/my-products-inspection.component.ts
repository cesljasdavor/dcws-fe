import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from "../../../../shared/product";
import {Category} from "../../../../shared/category";
import {Subscription} from "rxjs";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VendorService} from "../vendor.service";
import {CategoryService} from "../../../../product-page/category.service";
import {ProfileService} from "../../../profile.service";

@Component({
  selector: 'app-my-products-inspection',
  templateUrl: './my-products-inspection.component.html',
  styleUrls: ['./my-products-inspection.component.css']
})
export class MyProductsInspectionComponent implements OnInit, OnDestroy {
  //svi produkti
  myProducts: Product[] = [];

  //za search
  searchedTitle: string = "";
  searchedCategory: string = "";
  toPrice: number = null;
  available: boolean = true;

  product: Product;

  categories: Category[] = [];

  modalRef: NgbModalRef;

  private addSubs: Subscription;
  private delSubs: Subscription;
  private updateSubs: Subscription;

  constructor(private modalService: NgbModal,
              private vendorService: VendorService,
              private categoryService: CategoryService,
              private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.myProducts = this.vendorService.requireMyProducts();

    this.categories = this.categoryService.requireCategories();
  }

  refreshMyProducts() {
    this.vendorService.refresh();
    this.myProducts = this.vendorService.requireMyProducts();
  }

  deleteProduct(product: Product) {
    this.delSubs = this.vendorService.deleteProduct(product).subscribe(
      response => {
        //izmjena unutar servisa
        let products = this.vendorService.productService.products;
        let index = products.findIndex(
          (p: Product) => p === product);
        products.splice(index, 1);

        this.refreshMyProducts();
      }
    );
  }

  openToUpdate(content, toUpdate:Product) {
    //stvori novi produkt isit ovakav
    this.product = Product.createSameProduct(toUpdate);
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  updateProduct(oldValueID: number) {
    let oldValue = this.myProducts.find((p: Product) => p.id_product === oldValueID);
    this.updateSubs = this.vendorService.updateProduct(oldValue, this.product).subscribe(
      response => {
        //izmjena unutar servisa
        let products = this.vendorService.productService.products;
        let index = products.findIndex(
          (p: Product) => p === oldValue);
        products.splice(index, 1, this.product);

        this.modalRef.close();

        this.refreshMyProducts();
      }
    );
  }

  openToCreate(content) {
    //novi prazan produkt
    this.product = Product.createEmptyProduct(this.profileService.myProfile.email);
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  addProduct() {
    this.addSubs = this.vendorService.addProduct(this.product).map(response => response.json())
      .subscribe(
        data => {
          //izmjena unutar servisa, samo pričekaj id sa servera
          this.product.id_product = data.id;
          this.vendorService.productService.products.push(this.product);

          this.modalRef.close();

          this.refreshMyProducts();
        }
      );
  }

  addCategory(categoryName: string) {
    let index = this.product.categories.findIndex(
      (category: string) => category === categoryName);
    if(index === -1) {
      this.product.categories.push(categoryName);
    }
  }

  getCategories() {
    return this.categories;
  }

  deleteThisCategory(categoryName: string) {
    let index = this.product.categories.findIndex(
      (name: string) => name === categoryName);
    if(index !== -1) {
      this.product.categories.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    if(this.delSubs !== undefined) {
      this.delSubs.unsubscribe();
    }

    if(this.addSubs !== undefined) {
      this.addSubs.unsubscribe();
    }

    if(this.updateSubs !== undefined) {
      this.updateSubs.unsubscribe();
    }

  }
}
