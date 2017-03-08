import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/user";
import {AdminService} from "../admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteResolver} from "../../../../shared/routeResolver";

@Component({
  selector: 'app-my-vendors',
  templateUrl: 'my-vendors.component.html',
  styleUrls: ['my-vendors.component.css']
})
export class MyVendorsComponent implements OnInit {

  pageVendors: User[] = [];

  page: number = 1;

  constructor(private adminService: AdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  changePage() {
    //opet predajemo privilegiju 1
    this.pageVendors = this.adminService.getPageUsers(this.page,1);
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
  }

  ngOnInit() {
    this.changePage();
  }

  onDeleteUser(user: User) {
    this.adminService.deleteUser(user);

    if(this.pageVendors.length === 1 && this.page > 1) {
      this.page--;
    }
    this.changePage();
  }

  //za pagination
  getSize(): number {
    //0 jer je privilegija 0
    return this.adminService.getNumberOfUsers(1);
  }

  getPageSize(): number {
    return this.adminService.pageSize;
  }

}
