import { Component } from '@angular/core';

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

}
