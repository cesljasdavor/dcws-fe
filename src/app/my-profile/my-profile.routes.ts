import {Routes} from "@angular/router";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {SoldComponent} from "./user-type/vendor/sold/sold.component";
import {BoughtComponent} from "./user-type/buyer/bought/bought.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ShoppingCartComponent} from "./user-type/buyer/shopping-cart.component";
import {EditingCategoriesComponent} from "./user-type/admin/editing-categories/editing-categories.component";
import {BuyersInspectionComponent} from "./user-type/admin/buyers-inspection/buyers-inspection.component";
import {MyVendorsInspectionComponent} from "./user-type/admin/my-vendors-inspection/my-vendors-inspection.component";
import {MyProductsInspectionComponent} from "./user-type/vendor/my-products-inspection/my-products-inspection.component";

export const MY_PROFILE_ROUTES: Routes = [
  { path: '', component: ViewProfileComponent},
  { path: 'sold', component: SoldComponent},
  { path: 'bought', component: BoughtComponent},
  { path: 'change_password', component: ChangePasswordComponent},
  { path: 'edit_profile', component: EditProfileComponent},
  { path: 'my_vendors_inspection', component: MyVendorsInspectionComponent},
  { path: 'shopping_cart', component: ShoppingCartComponent},
  { path: 'my_products_inspection', component: MyProductsInspectionComponent},
  { path: 'buyers_inspection', component: BuyersInspectionComponent},
  { path: 'editing_categories', component: EditingCategoriesComponent}

];
