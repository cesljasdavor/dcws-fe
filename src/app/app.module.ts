import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //ovo trebaš i u druge module ubaiti jedino bez forRoot
import { Ng2PaginationModule } from "ng2-pagination";
import { routing } from "./app.routing";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ProductPageComponent } from './product-page/product-page.component';
import { LeftProductMenuComponent } from './product-page/left-product-menu.component';
import { ProductListComponent } from './product-page/product-list/product-list.component';
import { ProductListItemComponent } from './product-page/product-list/product-list-item/product-list-item.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { LeftMyProfileMenuComponent } from './my-profile/left-my-profile-menu.component';
import { DcwsProfileDropdownDirective } from './my-profile/dcws-profile-dropdown.directive';
import { DcwsMenuDropdownDirective } from './product-page/dcws-menu-dropdown.directive';
import { ViewProfileComponent } from './my-profile/view-profile/view-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './my-profile/change-password/change-password.component';
import { BoughtComponent } from './my-profile/user-type/buyer/bought/bought.component';
import { SoldComponent } from './my-profile/user-type/vendor/sold/sold.component';
import { MyVendorsComponent } from './my-profile/user-type/admin/my-vendors/my-vendors.component';
import { ShoppingCartComponent } from './my-profile/user-type/buyer/shopping-cart.component';
import { MyProductsComponent } from './my-profile/user-type/vendor/my-products/my-products.component';
import { EditBuyersComponent } from './my-profile/user-type/admin/edit-buyers/edit-buyers.component';

import {ProfileService} from "./my-profile/profile.service";
import {CityService} from "./my-profile/city.service";
import {ProductService} from "./product-page/product.service";
import {ShoppingCartService} from "./my-profile/user-type/buyer/shopping-cart.service";
import { ShoppingItemComponent } from './my-profile/user-type/buyer/shopping-item/shopping-item.component';
import { UserSmallComponent } from './my-profile/user-type/admin/user-small/user-small.component';
import {AdminService} from "./my-profile/user-type/admin/admin.service";
import {CategoryService} from "./product-page/category.service";
import { InspectCategoryComponent } from './my-profile/user-type/admin/inspect-categories/inspect-category/inspect-category.component';
import { InspectCategoriesComponent } from './my-profile/user-type/admin/inspect-categories/inspect-categories.component';
import { MyProductsItemComponent } from './my-profile/user-type/vendor/my-products/my-products-item/my-products-item.component';
import {VendorService} from "./my-profile/user-type/vendor/vendor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DcwsMenuDropdownDirective,
    ProductPageComponent,
    LeftProductMenuComponent,
    ProductListComponent,
    ProductListItemComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MyProfileComponent,
    AboutComponent,
    LeftMyProfileMenuComponent,
    LeftMyProfileMenuComponent,
    DcwsProfileDropdownDirective,
    ViewProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    BoughtComponent,
    SoldComponent,
    MyVendorsComponent,
    ShoppingCartComponent,
    MyProductsComponent,
    EditBuyersComponent,
    ShoppingItemComponent,
    UserSmallComponent,
    InspectCategoryComponent,
    InspectCategoriesComponent,
    MyProductsItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    Ng2PaginationModule,
    routing
  ],
  providers: [
    ProfileService,
    ShoppingCartService,
    AdminService,
    CategoryService,
    CityService,
    ProductService,
    VendorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
