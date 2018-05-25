import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './components/misc/companies/companies.component';
import { HomeComponent } from './components/misc/home/home.component';
import { AppComponent } from './app.component';
import { PostExamWorkComponent } from './components/exam-work-pages/post-exam-work/post-exam-work.component';
import { CreateCompanyProfileComponent } from './components/register-login/create-company-profile/create-company-profile.component';
import { StudentsComponent } from './components/misc/students/students.component';
import { CreateStudentProfileComponent } from './components/register-login/create-student-profile/create-student-profile.component';
import { StudentHomeComponent } from './components/student-pages/student-home/student-home.component';
import { StudentProfileComponent } from './components/student-pages/student-profile/student-profile.component';
import { StudentViewExamWorkComponent } from './components/exam-work-pages/student-view-exam-work/student-view-exam-work.component';
import { EditStudentProfileComponent } from './components/student-pages/edit-student-profile/edit-student-profile.component';
import { CompanyHomeComponent } from './components/company-pages/company-home/company-home.component';
import { CompanyProfileComponent } from './components/company-pages/company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './components/company-pages/edit-company-profile/edit-company-profile.component';
import { EditExamWorkComponent } from './components/exam-work-pages/company/edit-exam-work/edit-exam-work.component';
import { LoginComponent } from './components/register-login/login/login.component';
import { RegisterChoiceComponent } from './components/register-login/register-choice/register-choice.component';
import { ExamWorkDashboardComponent } from './components/exam-work-pages/company/exam-work-dashboard/exam-work-dashboard.component';
import { StudentAuthGuard } from './guards/student-auth.guard';
import { CompanyGuard } from './guards/company.guard';
import { LoginGuard } from './guards/login.guard';

// Routes sköts här
const routes: Routes = [

  // register/login paths
  // Guarded by LoginGuard
{
  path: '',
  canActivate: [LoginGuard],
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/login',
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register-choice',
      component: RegisterChoiceComponent
    },
    {
      path: 'create-company-profile',
      component: CreateCompanyProfileComponent
    },
    {
      path: 'create-student-profile',
      component: CreateStudentProfileComponent
    },
  ]
},

// Student paths
// Guarded by StudentAuthGuard
{
  path: 'student',
  canActivate: [StudentAuthGuard],
  children: [
    {
      path: 'home',
      component: StudentHomeComponent
    },
    {
      path: ':id',
      component: StudentProfileComponent
    },
    {
      path: 'profile',
      component: StudentProfileComponent
    },
    {
      path: 'profile/edit',
      component: EditStudentProfileComponent
    },
    {
      path: 'view-exam-work/:id',
      component: StudentViewExamWorkComponent
    },
  ]
},

// Company paths
// Guarded by CompanyGuard
{
  path: 'company',
  canActivate: [CompanyGuard],
  children: [
    {
      path: 'home',
      component: CompanyHomeComponent
    },
    {
      path: ':id',
      component: CompanyProfileComponent
    },
    {
      path: 'profile',
      component: CompanyProfileComponent
    },
    {
      path: 'profile/edit',
      component: EditCompanyProfileComponent
    },
    {
      path: 'exam-work/edit-exam-work/:id',
      component: EditExamWorkComponent
    },
    {
      path: 'post-exam-work',
      component: PostExamWorkComponent
    },
    {
      path: 'exam-work-dashboard/:id',
      component: ExamWorkDashboardComponent
    },
  ]

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
