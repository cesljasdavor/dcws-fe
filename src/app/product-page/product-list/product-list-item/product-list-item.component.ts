import {Component, OnInit, Input} from '@angular/core';
import {Product} from "../../../shared/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../my-profile/profile.service";
import {BuyerService} from "../../../my-profile/user-type/buyer/buyer.service";
import {BehaviorSubject} from "rxjs";
import {ProductService} from "../../product.service";

@Component({
  selector: 'dcws-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;
  // služi za prikaz
  toShow: Product;

  //da imam negdje spremljeno, a ne magic numbers
  substringLength: number = 65;

  recommended: Product[];


  constructor(private modalService: NgbModal,
              public profileService: ProfileService,
              private buyerService: BuyerService,
              private productService: ProductService
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
    //jesam li kupac
    if(this.profileService.getPrivilege() === 0) {
      this.recommend();
    }
  }

  openProduct(content, selected: Product) {
    this.toShow = selected;
    this.open(content);
  }

  addToCart() {
    this.buyerService.addToCart(this.toShow);
  }

  recommend() {
    this.recommended = this.productService.recommend(this.toShow);
  }
}
