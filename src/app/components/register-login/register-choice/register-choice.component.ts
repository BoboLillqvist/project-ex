import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-choice',
  templateUrl: './register-choice.component.html',
  styleUrls: ['./register-choice.component.scss']
})
export class RegisterChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/background%2Fblue.jpg?alt=media&token=ca6ba99c-8599-4045-a940-1478d1dbbb20')"; 
  }

}
