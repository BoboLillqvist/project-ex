import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Student } from '../../../models/student.model';
import { Company } from '../../../models/company.model';
import { StudentService } from '../../../services/student.service';
import { CompanyService } from '../../../services/company.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserAuthService, StudentService, CompanyService]
})
export class LoginComponent implements OnInit {

  user: User;
  student: Student;
  company: Company;
  validInfo: boolean = true;
  serverErr: boolean = false;

  constructor(private auth: UserAuthService, private router: Router,
              private studServ: StudentService, private compServ: CompanyService) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    document.getElementById('main-navbar').setAttribute('hidden', 'true');
    document.getElementById('main-footer').setAttribute('hidden', 'true');
    document.body.style.backgroundImage = 'url(\'https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/background%2Fblue.jpg?alt=media&token=ca6ba99c-8599-4045-a940-1478d1dbbb20\')'; 
  }

  login() {
    this.auth.login(this.user).subscribe( (resData: any) => {
      console.log(resData);
      // objekt innehållande en user och en jwt-token kommer tillbaka
      // login successful
      this.validInfo = true;

      // get role id form token data
      this.user = resData.user;
      this.auth.user = this.user;

      this.getRoleObject();


    }, (err) => {
      console.log(err);
      // invalid userinfo
      if (err.status === 401) {

        this.clearInput();
        this.validInfo = false;

      } else {
        this.serverErr = true;
      }

    });
  }

  getRoleObject() {
    if (this.user.role === 'student') {

      this.studServ.getStudent(this.user.roleId).subscribe( (resData: any) => {
        this.student = resData;

        this.redirect('/student/');
      });

    } else {

      this.compServ.getCompany(this.user.roleId).subscribe( (resData: any) => {
        this.company = resData;

        this.redirect('/company/');
      });

    }
  }

  redirect(path) {
    document.getElementById('main-navbar').setAttribute('hidden', 'false');
    path += this.user.roleId;
    this.router.navigateByUrl(path);
  }

  clearInput() {
    this.user.username = '';
    this.user.password = '';
  }

}
