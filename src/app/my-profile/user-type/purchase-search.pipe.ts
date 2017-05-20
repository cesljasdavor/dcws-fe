import { Pipe, PipeTransform } from '@angular/core';
import {Purchase} from "../../shared/purchase";

@Pipe({
  name: 'boughtSearch'
})
export class PurchaseSearchPipe implements PipeTransform {

  transform(purchases: Purchase[], receiptId: number, title: string, on_the_way: boolean): any {
    if(purchases.length === 0) {
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
