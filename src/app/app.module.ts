import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from './companies/companies.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TwbootstrapModule } from './layout/twbootstrap/twbootstrap.module';

import { AppComponent } from './app.component';
import { FilterTitlePipe, FilterDescriptionPipe } from './home/filter.pipe';
import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './file-upload/image-upload/image-upload.component';
import { PostExamWorkComponent } from './post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './profiles/create-company-profile/create-company-profile.component';
import { CreateStudentProfileComponent } from './profiles/create-student-profile/create-student-profile.component';
import { AddStudentSkillsComponent } from './post-exam-work/add-student-skills/add-student-skills.component';
import { PdfUploadComponent } from './file-upload/pdf-upload/pdf-upload.component';
import { StudentHomeComponent } from './student-pages/student-home/student-home.component';
import { EditStudentProfileComponent } from './student-pages/edit-student-profile/edit-student-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompaniesComponent,
    HomeComponent,
    NavbarComponent,
    ImageUploadComponent,
    PostExamWorkComponent,
    CreateCompanyProfileComponent,
    StudentsComponent,
    CreateStudentProfileComponent,
    FilterTitlePipe,
    FilterDescriptionPipe,
    AddStudentSkillsComponent,
    PdfUploadComponent,
    StudentHomeComponent,
    EditStudentProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    TwbootstrapModule,
    FormsModule,
  ],

  exports: [
    TwbootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
