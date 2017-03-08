import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {City} from "../../shared/city";
import {ProfileService} from "../profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteResolver} from "../../shared/routeResolver";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordChangeData: {oldPassword: string, newPassword: string, newPasswordAgain: string} =
    {oldPassword: "", newPassword: "", newPasswordAgain: ""};

  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  changePassword(form: NgForm) {
    if(this.passwordChangeData.newPassword === this.passwordChangeData.newPasswordAgain) {
      let status: boolean = this.profileService.changePassword(
                                            this.passwordChangeData.oldPassword,
                                            this.passwordChangeData.newPassword
      );
      if(status) {
        console.log(status);
        this.router.navigate(['../']);
        RouteResolver.goToFragment(this.router, this.activatedRoute.parent, "top-page");
      } else {
        //zacrveni nekaj
      }
    }
  }

}
