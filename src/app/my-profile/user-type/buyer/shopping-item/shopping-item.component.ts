import {Component, OnInit, Input} from '@angular/core';
import {ShoppingItem} from "../shopping-item";
import {ProfileService} from "../../../profile.service";
import {BuyerService} from "../buyer.service";

@Component({
  selector: 'dcws-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @Input() shoppingItem: ShoppingItem;

  // substringLength: number = 65;

  constructor(private shoppingCartService: BuyerService) { }

  ngOnInit() {
  }

  onDelete() {
    this.shoppingCartService.removeFromCart(this.shoppingItem);
  }

}
