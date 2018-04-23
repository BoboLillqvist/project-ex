import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PostExamWorkComponent } from './post-exam-work/post-exam-work.component';



//Routes sköts här
const routes: Routes = [
{path:'', redirectTo:'/home', pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'companies', component: CompaniesComponent},
{path: 'post-exam-work', component: PostExamWorkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }