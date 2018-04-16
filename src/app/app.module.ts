import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TwbootstrapModule } from './twbootstrap/twbootstrap.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
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
