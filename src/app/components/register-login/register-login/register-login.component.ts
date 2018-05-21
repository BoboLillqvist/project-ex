import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
