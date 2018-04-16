import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from './companies/companies.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

// Bootstrap modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { HomeComponent } from './home/home.component';

import { TwbootstrapModule } from './twbootstrap/twbootstrap.module';


import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompaniesComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    TwbootstrapModule
  ],

  exports: [
    TwbootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
