import {Component, OnInit, Input} from '@angular/core';
import {Product} from "../../../shared/product";

@Component({
  selector: 'dcws-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {

  }

}
