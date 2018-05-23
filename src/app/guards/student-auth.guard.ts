import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {

  constructor(private auth: UserAuthService, private router: Router) {}

  canActivate() {

    if (this.auth.loggedIn() && ( this.auth.getRole() === 'student' )) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
