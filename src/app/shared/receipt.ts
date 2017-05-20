import {Purchase} from "./purchase";

export class Receipt {
  constructor(
    public purchases: Purchase[],
    public id?: number,
    public total?:number
  ){}
}
