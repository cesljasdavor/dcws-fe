import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../shared/user";
import {City} from "../../shared/city";
import {ProfileService} from "../profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteResolver} from "../../shared/routeResolver";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Response} from "@angular/http";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  passwordChangeData: {oldPassword: string, newPassword: string, newPasswordAgain: string} =
    {oldPassword: "", newPassword: "", newPasswordAgain: ""};

  private subscription: Subscription;

  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  changePassword(form: NgForm) {
    if(this.passwordChangeData.newPassword === this.passwordChangeData.newPasswordAgain
      && this.passwordChangeData.oldPassword === this.profileService.myProfile.password) {
      let observable: Observable<Response> = this.profileService.changePassword(
                                            this.passwordChangeData.newPassword);
      this.subscription = observable.subscribe(response => {
          this.flashMessage.show('Vaša lozinka je promijenjena',
            { cssClass: 'alert alert-success alert-message', timeout: 2000 });
          this.profileService.myProfile.password = this.passwordChangeData.newPassword;
          this.router.navigate(['../']);
          RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
      },
      error => {
        this.flashMessage.show('Neuspješna promjena lozinke!',
          { cssClass: 'alert alert-danger alert-message', timeout: 2000 });
        RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
      });
    }
  }

  ngOnDestroy(): void {
    if(this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
