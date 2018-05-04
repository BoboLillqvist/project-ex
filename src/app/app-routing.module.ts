import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PostExamWorkComponent } from './post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './profiles/create-company-profile/create-company-profile.component';
import { StudentsComponent } from './students/students.component';
import { CreateStudentProfileComponent } from './profiles/create-student-profile/create-student-profile.component';
import { StudentHomeComponent } from './student-pages/student-home/student-home.component';
import { StudentProfileComponent } from './student-pages/student-profile/student-profile.component';
import { EditStudentProfileComponent } from './student-pages/edit-student-profile/edit-student-profile.component';
import { CompanyHomeComponent } from './company-pages/company-home/company-home.component';
import { CompanyProfileComponent } from './company-pages/company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './company-pages/edit-company-profile/edit-company-profile.component';

// Routes sköts här
const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},

{path: 'create-student-profile', component: CreateStudentProfileComponent},

{path: 'create-company-profile', component: CreateCompanyProfileComponent},
{path: 'student/home', component: StudentHomeComponent},
{path: 'student/profile', component: StudentProfileComponent},
{path: 'student/edit-profile', component: EditStudentProfileComponent},
{path: 'company/home', component: CompanyHomeComponent},
{path: 'company/profile', component: CompanyProfileComponent},
{path: 'company/edit-profile', component: EditCompanyProfileComponent},

{path: 'companies', component: CompaniesComponent},
{path: 'post-exam-work', component: PostExamWorkComponent},
{path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
