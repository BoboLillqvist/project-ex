import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'First Contact';
  hideNavbar: boolean;

  constructor(private auth: UserAuthService) {
    this.hideNavbar = true;
  }

  ngAfterContentChecked() {
    this.hideNavbar = !this.auth.loggedIn();
  }
}
