import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cancle',
  templateUrl: './cancle.component.html',
  styleUrls: ['./cancle.component.scss']
})
export class CancleComponent {
  modalRef: BsModalRef;
  message: string;

  constructor(
    private modalService: BsModalService,
    private location: Location
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.location.back();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
