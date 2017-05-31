import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {ProfileService} from "./my-profile/profile.service";
import {Observable, Subscription, Subject} from "rxjs";

@Injectable()
export class UnauthGuard implements CanActivate{

  constructor(private profileService: ProfileService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let subs: Subscription = this.profileService.observeLogin()
          .subscribe(
            (data: boolean) => {
              if(data) {
                window.alert("Već ste prijavljeni! Ukoliko želite otići na drugi profil ili kreirati novi profil molimo " +
                  "Vas da se odjavite od trenutnog.");
                this.router.navigate(['/']);
              }

              subs.unsubscribe();
            }
          );

    return this.profileService.observeLogin().map((data: boolean) => !data);
  }
}
