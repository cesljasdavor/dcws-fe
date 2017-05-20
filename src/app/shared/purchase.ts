
import {ShoppingItem} from "../my-profile/user-type/buyer/shopping-item";
import {User} from "./user";
export class Purchase {
  constructor(
    public user_id: number,
    public product_id: number,
    public product_title: string,
    public amount: number,
    public price: number,
    public on_the_way: boolean,
    public id?: number,
    public receipt_id?: number,
    public created_at?: Date,
    public updated_at?: Date
  ){}

  static stringToDate(dateString) {
    return new Date(dateString);
  }

  static fromShoppingItem(shoppingItem: ShoppingItem, myProfile: User) {
      return new Purchase(
        myProfile.id,
        shoppingItem.product.id_product,
        shoppingItem.product.title,
        shoppingItem.amount,
        shoppingItem.product.price,
        false
      );
  }
}
