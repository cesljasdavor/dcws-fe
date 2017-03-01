import {Routes, RouterModule} from "@angular/router";
import {ProductPageComponent} from "./product-page/product-page.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {AboutComponent} from "./about/about.component";
import {MY_PROFILE_ROUTES} from "./my-profile/my-profile.routes";

const APP_ROUTES: Routes = [
  {path: '', component: ProductPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my_profile', component: MyProfileComponent, children: MY_PROFILE_ROUTES},
  {path: 'my_profile', component: MyProfileComponent},
  {path: 'about', component: AboutComponent},

  //ako se bilo kaj drugo upiše
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
