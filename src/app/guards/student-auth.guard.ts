import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {

  constructor(private auth: UserAuthService, private router: Router) {}

  // denna canActivate() kallas när någon försöker gå till path /student/*
  // Om if satsen inte går igenom så är man inte en inloggad student
  // och skickas då till login sidan.
  // kolla i app-routing.module för att se hur denna guard är tillagd på pathsen
  canActivate() {
    const role = this.auth.getRole();
    if (this.auth.loggedIn() && ( role === 'student' || role === 'admin' )) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
