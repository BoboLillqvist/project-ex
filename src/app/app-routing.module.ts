import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PostExamWorkComponent } from './post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './profiles/create-company-profile/create-company-profile.component';
import { StudentsComponent } from './students/students.component';
import { CreateStudentProfileComponent } from './profiles/create-student-profile/create-student-profile.component';




// Routes sköts här
const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'companies', component: CompaniesComponent},
{path: 'post-exam-work', component: PostExamWorkComponent},
{path: 'create-company-profile', component: CreateCompanyProfileComponent},
{path: 'create-student-profile', component: CreateStudentProfileComponent},
{path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
