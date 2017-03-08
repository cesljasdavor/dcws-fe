import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {User} from "../../../../shared/user";
import {RouteResolver} from "../../../../shared/routeResolver";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-buyers',
  templateUrl: 'edit-buyers.component.html',
  styleUrls: ['edit-buyers.component.css']
})
export class EditBuyersComponent implements OnInit {

  page: number = 1;

  pageBuyers: User[] = [];

  constructor(private adminService: AdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  changePage() {
    //opet predajemo privilegiju 0
    this.pageBuyers = this.adminService.getPageUsers(this.page,0);
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
  }

  ngOnInit() {
    this.changePage();
  }

  onDeleteUser(user: User) {
    this.adminService.deleteUser(user);

    if(this.pageBuyers.length === 1 && this.page > 1) {
      this.page--;
    }
    this.changePage();
  }

  //za pagination
  getSize(): number {
    //0 jer je privilegija 0
    return this.adminService.getNumberOfUsers(0);
  }

  getPageSize(): number {
    return this.adminService.pageSize;
  }

}
