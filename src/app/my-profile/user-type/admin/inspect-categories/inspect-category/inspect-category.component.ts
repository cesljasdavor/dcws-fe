import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Category} from "../../../../../shared/category";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'dcws-inspect-category',
  templateUrl: 'inspect-category.component.html',
  styleUrls: ['inspect-category.component.css']
})
export class InspectCategoryComponent implements OnInit {

  @Input() category: Category;
  @Output() deleted: EventEmitter<Category> = new EventEmitter();
  @Output() updated: EventEmitter<{oldValue: Category, newValue: Category}> = new EventEmitter();

  newValue: Category;

  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  open(content) {
    if(!this.newValue) this.newValue = new Category(this.category.name, this.category.description);
    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  updateCategory(form: NgForm) {
    //tu namjestiš novu vrijednost i emmitaš
    this.updated.emit({oldValue: this.category, newValue: this.newValue});
    this.modalRef.close();
  }

  deleteCategory() {
    this.deleted.emit(this.category);
  }

}
