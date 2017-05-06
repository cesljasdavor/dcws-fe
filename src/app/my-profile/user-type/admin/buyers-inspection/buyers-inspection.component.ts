import { Component, OnInit } from '@angular/core';
import {UserView} from "../userView";
import {Subscription} from "rxjs";
import {AdminService} from "../admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-buyers-inspection',
  templateUrl: './buyers-inspection.component.html',
  styleUrls: ['./buyers-inspection.component.css']
})
export class BuyersInspectionComponent implements OnInit {

  page: number = 1;

  buyers: UserView[] = [];

  show: UserView;

  searched = "";

  private deleteSubs: Subscription;
  constructor(private adminService: AdminService,
              private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.buyers = this.adminService.requireBuyers();
  }

  open(content, user: UserView) {
    this.show = user;
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  deleteUser(user: UserView) {
    this.deleteSubs = this.adminService.deleteUser(user).subscribe(
      response => {
        let index = this.adminService.buyers.findIndex(
          (u: UserView) => u===user);

        this.adminService.buyers.splice(index,1);
      },
      error => console.log("Ne mogu obrisati kupca!")
    );
  }


  ngOnDestroy(): void {
    if(this.deleteSubs !== undefined) {
      this.deleteSubs.unsubscribe();
    }
  }
}
