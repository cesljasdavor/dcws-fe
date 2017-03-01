import {Directive, HostBinding, HostListener, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[dcwsMenuDropdown]'
})

//korostiti će se i u ostalim dijelovima app-a ne samo za left-product-menu
export class DcwsMenuDropdownDirective {

  isOpen: boolean = false;

  @HostBinding("class.fa-chevron-up") get opened() {
    return this.isOpen;
  }

  @HostBinding("class.fa-chevron-down") get closed() {
    return !this.isOpen;
  }

  @HostListener("click") open() {
    this.isOpen = !this.isOpen;
  }

  constructor() {
  }

}
