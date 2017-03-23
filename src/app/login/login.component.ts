import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../my-profile/profile.service";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {RouteResolver} from "../shared/routeResolver";
import {FlashMessagesService} from "angular2-flash-messages";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginData: {email: string, password: string} = {email: "", password: ""}

  private subs: Subscription;


  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.flashMessage.grayOut(true);
  }

  login(form: NgForm) {
    let observable = this.profileService.login(form.value.email, form.value.password);
    this.subs = observable.subscribe(
      (response) => {
        this.router.navigate(['/']);
        RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
        this.flashMessage.show('Dobrodošli, ' + this.loginData.email + "!",
          { cssClass: 'alert alert-info alert-message', timeout: 2000 });
      },
      (error) => {
        this.flashMessage.show('Unijeli ste krive podatke, molimo Vas unesite ispravne',
          { cssClass: 'alert alert-danger alert-message', timeout: 2000 });
        RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subs !== undefined) {
      this.subs.unsubscribe();
    }
  }
}
