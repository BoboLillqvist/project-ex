import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExamWork } from '../../../models/exam-work.model';
import { ExamworkService } from '../../../services/examwork.service';
import { Person } from '../../../models/person.model';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-student-view-exam-work',
  templateUrl: './student-view-exam-work.component.html',
  styleUrls: ['./student-view-exam-work.component.scss'],
  providers: [ExamworkService]
})
export class StudentViewExamWorkComponent implements OnInit {

  exWorkId: String;
  examWork: ExamWork;

  constructor(private route: ActivatedRoute, private examService: ExamworkService) {
    this.exWorkId = route.snapshot.params['id'];
    this.examWork= new ExamWork("","","",[],[],"","",new Person("", "", "", ""),"",new Company("", "", "", [], 'http://via.placeholder.com/140x140'));
  }

  ngOnInit() {
    this.examService.getExamWork(this.exWorkId).subscribe(resData => this.examWork = resData);
  }

}
