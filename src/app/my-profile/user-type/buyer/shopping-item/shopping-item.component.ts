import {Component, OnInit, Input} from '@angular/core';
import {ShoppingItem} from "../shopping-item";
import {ProfileService} from "../../../profile.service";

@Component({
  selector: 'dcws-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @Input() shoppingItem: ShoppingItem;

  substringLength: number = 65;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  onDelete() {
    this.profileService.removeFromCart(this.shoppingItem);
  }

}
