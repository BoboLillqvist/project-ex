import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("main-navbar").setAttribute('hidden', 'true');
      document.body.style.backgroundImage = "url('https://image.ibb.co/ediGeS/wp_blue.jpg')"; 
  }

}
