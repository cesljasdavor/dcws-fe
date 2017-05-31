import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from "../my-profile/profile.service";
import {Subscription} from "rxjs";
import {SearchService} from "../product-page/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dcws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean;

  privilege: number = -1;

  private subs: Subscription;

  constructor(private profileService: ProfileService,
              private searchService: SearchService,
              private router: Router
  ) { }

  ngOnInit() {
    this.subs = this.profileService.observeLogin().subscribe(
      (status: boolean) => {
        this.loggedIn = status;
        this.changePrivilege();
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logout() {
    this.router.navigate(['/']);
    this.profileService.logout();
  }

  changePrivilege() {
    if(this.loggedIn) {
      //0-Kupac,1-Prodavač, 2-Admin
      this.privilege = this.profileService.getPrivilege();
    } else {
      this.privilege = -1;
    }
  }

  changeSearchText(searchBox: HTMLInputElement) {
    this.router.navigate(['/']);
    this.searchService.fireSearchTextChange(searchBox.value);
    searchBox.value = "";
  }

  resetSearch() {
    this.searchService.reset();
  }

}
