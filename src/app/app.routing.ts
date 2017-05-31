import {Routes, RouterModule} from "@angular/router";
import {ProductPageComponent} from "./product-page/product-page.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {AboutComponent} from "./about/about.component";
import {MY_PROFILE_ROUTES} from "./my-profile/my-profile.routes";
import {AuthGuard} from "./auth-guard.service";
import {UnauthGuard} from "./unauth-guard.service";

const APP_ROUTES: Routes = [
  {path: '', component: ProductPageComponent},
  {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UnauthGuard]},
  {path: 'my_profile', component: MyProfileComponent, children: MY_PROFILE_ROUTES, canActivateChild: [AuthGuard]},
  {path: 'my_profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},

  //ako se bilo što drugo upiše
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
