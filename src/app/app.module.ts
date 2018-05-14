import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from './components/companies/companies.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TwbootstrapModule } from './layout/twbootstrap/twbootstrap.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './components/home/filter.pipe';
import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { StudentsComponent } from './components/students/students.component';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './components/file-upload/image-upload/image-upload.component';
import { PostExamWorkComponent } from './components/post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './components/profiles/create-company-profile/create-company-profile.component';
import { CreateStudentProfileComponent } from './components/profiles/create-student-profile/create-student-profile.component';
import { AddStudentSkillsComponent } from './components/post-exam-work/add-student-skills/add-student-skills.component';
import { PdfUploadComponent } from './components/file-upload/pdf-upload/pdf-upload.component';
import { StudentHomeComponent } from './components/student-pages/student-home/student-home.component';
import { EditStudentProfileComponent } from './components/student-pages/edit-student-profile/edit-student-profile.component';
import { StudentProfileComponent } from './components/student-pages/student-profile/student-profile.component';
import { EditCompanyProfileComponent } from './components/company-pages/edit-company-profile/edit-company-profile.component';
import { CompanyHomeComponent } from './components/company-pages/company-home/company-home.component';
import { CompanyProfileComponent } from './components/company-pages/company-profile/company-profile.component';
import { StudentViewExamWorkComponent } from './components/student-pages/student-view-exam-work/student-view-exam-work.component';
import { FindStudentsComponent } from './components/company-pages/exam-work-pages/find-students/find-students.component';
import { EditExamWorkComponent } from './components/company-pages/exam-work-pages/edit-exam-work/edit-exam-work.component';
import { LoginComponent } from './components/login/login.component';
import { CancleComponent } from './components/cancle/cancle.component';
import { SimpleTagComponent } from './components/profiles/create-student-profile/simple-tag/simple-tag.component';
import { BackComponent } from './components/back/back.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
    FilterPipe,
    AddStudentSkillsComponent,
    PdfUploadComponent,
    StudentHomeComponent,
    EditStudentProfileComponent,
    StudentProfileComponent,
    EditCompanyProfileComponent,
    CompanyHomeComponent,
    CompanyProfileComponent,
    StudentViewExamWorkComponent,
    FindStudentsComponent,
    EditExamWorkComponent,
    LoginComponent,
    CancleComponent,
    SimpleTagComponent,
    BackComponent,
    RegisterChoiceComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    TwbootstrapModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAhpOlHdneiUA4iwlv9Ul2RmZANXxXHrmM",
      authDomain: "firstcontact-3ad7f.firebaseapp.com",
      databaseURL: "https://firstcontact-3ad7f.firebaseio.com",
      projectId: "firstcontact-3ad7f",
      storageBucket: "firstcontact-3ad7f.appspot.com",
    }),
    AngularFireStorageModule
  ],

  exports: [
    TwbootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
