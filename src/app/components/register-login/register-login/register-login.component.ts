import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
  providers: [UserAuthService]
})
export class RegisterLoginComponent implements OnInit {

  user: User;
  usernameValid: boolean = true;

  constructor(private auth: UserAuthService, private router: Router) {
    this.user = new User('', '', '', '', '');

    if (document.URL.includes('student')) {
      this.user.role = 'student';
    } else {
      this.user.role = 'company';
    }

  }

  ngOnInit() {
  }

  register(name, callback) {
    this.user.name = name;
    this.user.username = this.user.username.toLowerCase();
    this.auth.register(this.user).subscribe( (resData: any) => {
      // jwt-token kommer tillbaka
      this.user = resData.user;
      callback(resData);

    }, (err) => {
      if (err.status === 406) {
        // invalid userinfo
        this.usernameValid = false;
        this.clearUserinfo();
        callback(err);
      } else {
        // db problems
      }
    });
  }

  setRoleId(roleId) {
    this.user.roleId = roleId;
    return this.auth.updateRoleId(this.user).subscribe( (resData: any) => {
      return true;
    }, (err) => {
      return false;
    });
  }

  redirect() {
    let path;
    console.log('redirect?? ');
    if (this.auth.getRole() === 'student') {
      path = '/student/';
    } else {
      path = '/company/';
    }

    this.router.navigateByUrl(path + 'home');
  }

  clearUserinfo() {
    this.user.username = '';
    this.user.password = '';
  }

  changePasswordType()
  {
    if (document.getElementById('inputPassword').getAttribute('type')==='password')
    {
      document.getElementById('inputPassword').setAttribute('type', 'text');
    }
    else 
    {
      document.getElementById('inputPassword').setAttribute('type', 'password');
    }
  }

}
