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


@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompaniesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
