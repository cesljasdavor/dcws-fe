import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../my-profile/profile.service";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {RouteResolver} from "../shared/routeResolver";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  wrongPassword: boolean = false;
  wrongEmail: boolean = false;

  loginData: {email: string, password: string} = {email: "", password: ""}

  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    let status = this.profileService.login(form.value.email, form.value.password);
    console.log(this.loginData);
    switch (status) {
      case 0: //ne postoji takav email u bazi
        this.wrongEmail = true;
        break;
      case 1: //password je krivi
        this.wrongPassword = true;
        break;
      case 2: //sve ok
        this.router.navigate(['/']);
        RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
        break;
      default:
        break;
    }
  }

}
