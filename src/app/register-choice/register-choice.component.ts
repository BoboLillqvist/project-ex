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
  }

}
