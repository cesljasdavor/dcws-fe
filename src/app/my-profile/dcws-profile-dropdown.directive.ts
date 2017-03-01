import {Directive, HostBinding, HostListener, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[dcwsProfileDropdown]'
})
//korostiti se samo za user dropdown
export class DcwsProfileDropdownDirective {

  isOpen: boolean = true;

  @HostBinding("class.fa-close") get opened() {
    return this.isOpen;
  }

  @HostBinding("class.fa-user") get closed() {
    return !this.isOpen;
  }

  @HostListener("click") open() {
    this.isOpen = !this.isOpen;
  }

  constructor() {
  }

}
