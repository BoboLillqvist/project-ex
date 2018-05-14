import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamWork } from '../../models/exam-work.model';
import { ExamworkService } from '../../examwork.service';
import { SimpleTagComponent } from '../../profiles/create-student-profile/simple-tag/simple-tag.component';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
  providers: [ExamworkService]
})
export class StudentHomeComponent implements OnInit {

  @ViewChild(SimpleTagComponent) tagComp;

  examWorks: Array<ExamWork> = [];
  sortedWorks: Array<ExamWork> = [];
  noWorks: boolean = false;

  constructor(private examService: ExamworkService) { }

  ngOnInit() {
    this.tagComp.placeholderText = 'Filtrera med nyckelord';
    this.examService.getExamWorks().subscribe( resData => {
      this.examWorks = resData;
      this.sortedWorks = resData;
    });
  }

}
