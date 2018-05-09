import { Component, OnInit } from '@angular/core';
import { ExamWork } from '../../models/exam-work.model';
import { ExamworkService } from '../../examwork.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
  providers: [ExamworkService]
})
export class StudentHomeComponent implements OnInit {

  examWorks: Array<ExamWork> = [];

  constructor(private examService: ExamworkService) { }

  ngOnInit() {
    this.examService.getExamWorks().subscribe( resData => {
      this.examWorks = resData;
    });
  }

}
