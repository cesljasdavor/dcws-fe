import {Component, OnInit, Input} from '@angular/core';
import {Product} from "../../../shared/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../my-profile/profile.service";

@Component({
  selector: 'dcws-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;

  //da imam negdje spremljeno, a ne magic numbers
  substringLength: number = 65;

  isBuyer: boolean = false;
  constructor(private modalService: NgbModal, private profileService: ProfileService) { }

  ngOnInit() {
    this.isBuyer = this.profileService.getPrivilege() == 0;
  }

  open(content) {
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  addToCart() {
    this.profileService.addToCart(this.product);
  }

}
