import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    CollapseModule,
    TypeaheadModule
  ],
  declarations: []
})
export class TwbootstrapModule { }
