import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TwbootstrapModule } from './twbootstrap/twbootstrap.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TwbootstrapModule
  ],
  exports: [
    TwbootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
