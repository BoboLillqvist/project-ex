import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { Alert } from 'selenium-webdriver';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    CollapseModule,
    TypeaheadModule,
    ModalModule,
    AlertModule,
    ProgressbarModule
  ],
  declarations: []
})
export class TwbootstrapModule { }
