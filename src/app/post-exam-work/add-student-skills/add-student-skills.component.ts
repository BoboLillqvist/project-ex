import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student-skills',
  templateUrl: './add-student-skills.component.html',
  styleUrls: [
    './../post-exam-work.component.scss',
    './add-student-skills.component.scss'
  ]
})
export class AddStudentSkillsComponent implements OnInit {

  enteredTags = {
    essentials: [],
    complimentary: []
  };

  essentialInputElement: any;
  complimentaryInputElement: any;

  availableTags: any[] = [
    'C++',
    'C#',
    'C',
    'PHP',
    'Python',
    'Java',
    'Javascript'
  ];

  constructor() {
    // TODO: Läs in "skills"-array från databasen
  }

  ngOnInit() {
  }
}
