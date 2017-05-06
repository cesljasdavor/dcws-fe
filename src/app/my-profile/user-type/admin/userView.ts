export class UserView {
  constructor(
    public active: boolean,
    public address: string,
    public city: string,
    public date_of_birth: Date,
    public email: string,
    public id: number,
    public name: string,
    public postal_code: number,
    public privilege: number,
    public surname: string,
    public telephone_number: string
  ){}
}
