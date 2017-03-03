import {Routes} from "@angular/router";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {SoldComponent} from "./sold/sold.component";
import {BoughtComponent} from "./bought/bought.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {MyVendorsComponent} from "./my-vendors/my-vendors.component";
import {ShoppingCartComponent} from "./user-type/buyer/shopping-cart.component";
import {MyProductsComponent} from "./user-type/vendor/my-products.component";
import {EditBuyersComponent} from "./user-type/admin/edit-buyers.component";

export const MY_PROFILE_ROUTES: Routes = [
  { path: '', component: ViewProfileComponent},
  { path: 'sold', component: SoldComponent},
  { path: 'bought', component: BoughtComponent},
  { path: 'change_password', component: ChangePasswordComponent},
  { path: 'edit_profile', component: EditProfileComponent},
  { path: 'my_vendors', component: MyVendorsComponent},
  { path: 'shopping_cart', component: ShoppingCartComponent},
  { path: 'my_products', component: MyProductsComponent},
  { path: 'edit_buyers', component: EditBuyersComponent},

];
