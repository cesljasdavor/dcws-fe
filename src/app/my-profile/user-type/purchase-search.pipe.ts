import { Pipe, PipeTransform } from '@angular/core';
import {Purchase} from "../../shared/purchase";

@Pipe({
  name: 'purchaseSearch'
})
export class PurchaseSearchPipe implements PipeTransform {

  transform(purchases: Purchase[], filterActive: boolean, receiptId: number, title: string, on_the_way: boolean): any {
    if(!filterActive) {
      return purchases;
    }

    return purchases.filter(
      (p:Purchase) => {
        return this.compare(p, receiptId, title, on_the_way);
      }
    );
  }


  private compare(p: Purchase, receiptId: number, title: string, on_the_way: boolean): boolean {
    if(title !== "") {
      if(!p.product_title.toUpperCase().includes(title.toUpperCase())) {
        return false;
      }
    }

    if(receiptId !== null) {
      if(p.receipt_id !== receiptId) {
        return false;
      }
    }

    return p.on_the_way === on_the_way;
  }

}
