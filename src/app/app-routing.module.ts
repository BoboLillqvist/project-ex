import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';


//Routes sköts här
const routes: Routes = [
{path:'', redirectTo:'/home', pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'companies', component: CompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }