import { Component, OnInit } from '@angular/core';
import {VendorService} from "../vendor.service";
import {ProductService} from "../../../../product-page/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Purchase} from "../../../../shared/purchase";
import {Product} from "../../../../shared/product";

@Component({
  selector: 'app-sold',
  templateUrl: 'sold.component.html',
  styleUrls: ['sold.component.css']
})
export class SoldComponent implements OnInit {
  purchases: Purchase[];

  productToDisplay: Product;

  //za search
  filterActive: boolean = false;
  searchedTitle: string = "";
  searched_otw: boolean = false;

  constructor(
    private vendorService: VendorService,
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.purchases = this.vendorService.requireAllPurchases();
  }

  displayProduct(productId: number, content) {
    this.productToDisplay = this.findProductById(productId);
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  findProductById(productId: number): Product {
    const product = this.productService.requireAllProducts().find(
      (p: Product) => p.id_product === productId);
    return product;
  }

  set_on_the_way(purchase: Purchase) {
    console.log(purchase.id);
    this.vendorService.set_on_the_way(purchase.id)
      .map(response => response.json(), error => console.log(error))
      .subscribe(data => {
        purchase.updated_at = Purchase.stringToDate(data);
        purchase.on_the_way = true;
      });
  }

  toggleFilter() {
    this.filterActive = !this.filterActive;
  }

}
