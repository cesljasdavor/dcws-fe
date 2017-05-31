import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "../../../storage-service.service";
import {GuardUtil} from "../../../shared/GuardUtil";

@Injectable()
export class VendorGuard implements CanActivate{

  constructor(private storageService: StorageService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return GuardUtil.canPass(this.storageService, this.router, 1, "prodavač");
  }
}
