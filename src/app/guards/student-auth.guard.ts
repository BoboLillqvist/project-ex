import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {

  constructor(private auth: UserAuthService, private router: Router) {}

  canActivate() {
    const role = this.auth.getRole();
    if (this.auth.loggedIn() && ( role === 'student' || role === 'admin' )) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
