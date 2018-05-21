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

  constructor(private auth: UserAuthService, private router: Router) {
    this.user = new User('', '', '', '');

    if (document.URL.includes('student')) {
      this.user.role = 'student';
    } else {
      this.user.role = 'company';
    }

  }

  ngOnInit() {
  }

  register(roleId) {
    this.user.roleId = roleId;
    this.auth.register(this.user).subscribe( resData => {
      console.log('success!');
      this.router.navigateByUrl('/students/profile');
      console.log('LOGINCOMPONENT: ' + resData);
    }, (err) => {
      console.error(err);
    });
  }

}
