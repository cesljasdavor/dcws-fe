import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //ovo trebaš i u druge module ubaiti jedino bez forRoot
import { routing } from "./app.routing";
import {FlashMessagesModule} from "angular2-flash-messages";

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
import { ShoppingCartComponent } from './my-profile/user-type/buyer/shopping-cart.component';

import {ProfileService} from "./my-profile/profile.service";
import {CityService} from "./my-profile/city.service";
import {ProductService} from "./product-page/product.service";
import {BuyerService} from "./my-profile/user-type/buyer/buyer.service";
import { ShoppingItemComponent } from './my-profile/user-type/buyer/shopping-item/shopping-item.component';
import {AdminService} from "./my-profile/user-type/admin/admin.service";
import {CategoryService} from "./product-page/category.service";
import {VendorService} from "./my-profile/user-type/vendor/vendor.service";
import { EditingCategoriesComponent } from './my-profile/user-type/admin/editing-categories/editing-categories.component';
import { SearchCategoryPipe } from './my-profile/user-type/admin/editing-categories/search-category.pipe';
import { BuyersInspectionComponent } from './my-profile/user-type/admin/buyers-inspection/buyers-inspection.component';
import { MyVendorsInspectionComponent } from './my-profile/user-type/admin/my-vendors-inspection/my-vendors-inspection.component';
import { SearchNameSurnamePipe } from './my-profile/user-type/admin/search-name-surname.pipe';
import { MyProductsInspectionComponent } from './my-profile/user-type/vendor/my-products-inspection/my-products-inspection.component';
import { SearchMyProductsPipe } from './my-profile/user-type/vendor/my-products-inspection/search-my-products.pipe';
import {NgxPaginationModule} from "ngx-pagination";
import {SearchService} from "./product-page/search.service";
import { MainSearchPipe } from './product-page/product-list/main-search.pipe';
import { PurchaseSearchPipe } from './my-profile/user-type/purchase-search.pipe';
import {FileUploadModule} from "ng2-file-upload";
import {AuthGuard} from "./auth-guard.service";
import {UnauthGuard} from "./unauth-guard.service";
import {StorageService} from "./storage-service.service";
import {AdminGuard} from "./my-profile/user-type/admin/admin-guard.service";
import {VendorGuard} from "./my-profile/user-type/vendor/vendor-guard.service";
import {BuyerGuard} from "./my-profile/user-type/buyer/buyer-guard.service";

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
    ShoppingCartComponent,
    ShoppingItemComponent,

    EditingCategoriesComponent,
    SearchCategoryPipe,
    BuyersInspectionComponent,
    MyVendorsInspectionComponent,
    SearchNameSurnamePipe,
    MyProductsInspectionComponent,
    SearchMyProductsPipe,
    MainSearchPipe,
    PurchaseSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    FlashMessagesModule,
    NgxPaginationModule,
    FileUploadModule
  ],
  providers: [
    StorageService,
    ProfileService,
    BuyerService,
    AdminService,
    CategoryService,
    CityService,
    ProductService,
    VendorService,
    SearchService,
    AuthGuard,
    UnauthGuard,
    AdminGuard,
    VendorGuard,
    BuyerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
