import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-choice',
  templateUrl: './register-choice.component.html',
  styleUrls: ['./register-choice.component.scss']
})
export class RegisterChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("main-navbar").setAttribute('hidden', 'true');
    document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/background%2Fwp_blue.jpg?alt=media&token=d30c846b-0907-45b2-a7bc-19eb1a549212')"; 
  }

}
