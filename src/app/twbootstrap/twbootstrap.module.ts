import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    TooltipModule,
    CollapseModule
  ],
  declarations: []
})
export class TwbootstrapModule { }
