import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from './companies/companies.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TwbootstrapModule } from './layout/twbootstrap/twbootstrap.module';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ImageUploadComponent } from './file-upload/image-upload/image-upload.component';
import { PostExamWorkComponent } from './post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './profiles/create-company-profile/create-company-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompaniesComponent,
    HomeComponent,
    NavbarComponent,
    ImageUploadComponent,
    PostExamWorkComponent,
    CreateCompanyProfileComponent
  ],
  imports: [
    BrowserModule,
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
