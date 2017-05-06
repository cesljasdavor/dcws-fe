import {Injectable, OnDestroy} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable, Subscription} from "rxjs";
import {ProfileService} from "../../profile.service";
import {UserView} from "./userView";

@Injectable()
export class AdminService implements OnDestroy{

  pageSize: number = 2;

  private buyersSubs: Subscription;
  buyers: UserView[] = [];

  private myVendorSubs: Subscription;
  myVendors: UserView[] = [];

  constructor(private http: Http,
              private profileService: ProfileService) {}

  deleteUser(user: UserView): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let observable = null;
    if(user.privilege === 0) {
      observable = this.http.post("http://localhost:3000/users/admin/delete_buyer.json", JSON.stringify(user), {headers: headers})
    } else if(user.privilege === 1) {
      observable = this.http.post("http://localhost:3000/users/admin/delete_vendor.json", JSON.stringify(user), {headers: headers})
    } else {
      return null;
    }

    return observable;
  }

  getMyVendors(): Observable<Response> {
    const adminId = {id: this.profileService.myProfile.id};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let observable = this.http.post("http://localhost:3000/users/admin/get_my_vendors.json",
                    JSON.stringify(adminId),
                    {headers: headers});
    this.myVendorSubs = observable
                        .map((response) => response.json())
                        .subscribe(
                          data => {
                            this.myVendors.splice(0,this.myVendors.length);
                            for(let vendor of <UserView[]> data) {
                              vendor.date_of_birth = new Date(vendor.date_of_birth);
                              this.myVendors.push(vendor);
                            }

                          });
    return observable;
  }

  requireMyVendors(): UserView[] {
    if(this.myVendors.length === 0) {
      this.getMyVendors();
    }
    return this.myVendors;
  }

  getBuyers(): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let observable = this.http.get("http://localhost:3000/users/admin/get_buyers.json",{headers: headers});
    this.buyersSubs = observable.map((response) => response.json())
                                .subscribe(
                                  data => {
                                    this.buyers.splice(0,this.buyers.length);
                                    for(let buyer of <UserView[]> data) {
                                      buyer.date_of_birth = new Date(buyer.date_of_birth);
                                      this.buyers.push(buyer);
                                    }
                                });
    return observable;
  }

  requireBuyers(): UserView[] {
    if(this.buyers.length === 0) {
      this.getBuyers();
    }
    return this.buyers;
  }

  ngOnDestroy(): void {
    if(this.buyersSubs !== undefined) {
      this.buyersSubs.unsubscribe();
    }
    if(this.myVendorSubs !== undefined) {
      this.myVendorSubs.unsubscribe();
    }
  }
}
