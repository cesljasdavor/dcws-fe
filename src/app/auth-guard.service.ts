import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {ProfileService} from "./my-profile/profile.service";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private profileService: ProfileService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let subs: Subscription = this.profileService.observeLogin().subscribe((data: boolean) => {
        if(!data) {
          window.alert("Niste prijavljeni! Molimo Vas da se prijavite kako biste pristupili ovoj stranici");
          this.router.navigate(['/']);
        }
        //ovo će se pozvati svaki put kada skočiš na rutu pa nema smisla više gledati ove stvari
        subs.unsubscribe();
      }
    );

    return this.profileService.observeLogin();
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
