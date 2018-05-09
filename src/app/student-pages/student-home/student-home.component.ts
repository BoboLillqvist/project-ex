import { Component, OnInit } from '@angular/core';
import { ExamWork } from '../../models/exam-work.model';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  constructor() { }
  examWorks: Array<ExamWork> = [];

  ngOnInit() {
  }

}
