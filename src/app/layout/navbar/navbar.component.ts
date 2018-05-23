import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean = true;

  name: string;

  isStudent: boolean = true;
  isCompany: boolean = true;

  constructor(private auth: UserAuthService,
              private router: Router
            ) { }

  ngOnInit() {
    const role = this.auth.getRole();

    if (role === 'admin') {

      this.isStudent = this.isCompany = true;

    } else if (role === 'student') {

      this.isStudent = true;
      this.isCompany = false;

    } else {

      this.isStudent = false;
      this.isCompany = true;

    }

    this.name = this.auth.getUserName();
  }

  ngAfterContentChecked() {
    this.name = this.auth.getUserName();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
