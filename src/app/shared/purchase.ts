
export class Purchase {
  constructor(
    public user_id: number,
    public product_id: number,
    public amount: number,
    public price: number,
    public on_the_way: boolean
  ){}
}
