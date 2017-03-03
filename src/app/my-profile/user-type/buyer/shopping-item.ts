import {Product} from "../../../shared/product";
export class ShoppingItem {
  constructor(
    public product: Product,
    public amount: number = 1
  ) { }
}
