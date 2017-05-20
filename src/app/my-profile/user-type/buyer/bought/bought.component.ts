import { Component, OnInit } from '@angular/core';
import {Purchase} from "../../../../shared/purchase";
import {BuyerService} from "../buyer.service";
import {ProductService} from "../../../../product-page/product.service";
import {Receipt} from "../../../../shared/receipt";
import {Product} from "../../../../shared/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bought',
  templateUrl: 'bought.component.html',
  styleUrls: ['bought.component.css']
})
export class BoughtComponent implements OnInit {

  purchases: Purchase[];

  receiptToDisplay: Receipt;

  productToDisplay: Product;

  //za search
  searchedTitle: string = "";
  searchedReceiptID: number = null;
  searched_otw: boolean = false;

  constructor(
    private buyerService: BuyerService,
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.purchases = this.buyerService.requireAllPurchases();
  }

  displayReceipt(receiptId: number, content) {
    this.receiptToDisplay = this.findReceiptById(receiptId);
    this.modalService.open(content, {windowClass: "light-modal", size: "lg"});
  }

  findReceiptById(receiptId: number): Receipt {
    const recPurchases = this.purchases.filter(
      (purchase: Purchase) => purchase.receipt_id === receiptId);
    return new Receipt(recPurchases, receiptId, this.calculateTotal(recPurchases));
  }

  calculateTotal(recPurchases: Purchase[]) {
    let total = 0;
    for(let purchase of recPurchases) {
      total += purchase.amount * purchase.price;
    }

    return total;
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

  addToCart() {
    this.buyerService.addToCart(this.productToDisplay);
  }
}
