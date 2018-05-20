import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Student } from '../../../models/student.model';
import { Company } from '../../../models/company.model';
import { StudentService } from '../../../services/student.service';
import { CompanyService } from '../../../services/company.service';

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

  constructor(private auth: UserAuthService, private router: Router,
              private studServ: StudentService, private compServ: CompanyService) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    document.getElementById("main-navbar").setAttribute('hidden', 'true');
      document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/background%2Fwp_blue.jpg?alt=media&token=d30c846b-0907-45b2-a7bc-19eb1a549212')"; 
  }

  login() {
    this.auth.login(this.user).subscribe( resData => {
      if (resData.username === undefined) {
        this.clearInput();
        this.validInfo = false;

        // setInterval(() => {
        //   this.validInfo = true;
        // }, 5000);

      } else {
        // login successful
        this.validInfo = true;
        this.user = resData;
        this.auth.user = this.user;

      }
    });
  }

}
