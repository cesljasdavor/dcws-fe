import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../../../shared/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminService} from "../admin.service";

@Component({
  selector: 'dcws-user-small',
  templateUrl: './user-small.component.html',
  styleUrls: ['./user-small.component.css']
})
export class UserSmallComponent implements OnInit {

  @Input() user: User;
  @Output() deleted: EventEmitter<User> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
    console.log(content);
  }

  deleteUser() {
    this.deleted.emit(this.user);
  }

}
