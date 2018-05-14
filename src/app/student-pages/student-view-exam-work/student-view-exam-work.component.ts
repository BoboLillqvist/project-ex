import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamWork } from '../../models/exam-work.model';
import { ExamworkService } from '../../services/examwork.service';

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
  }

  ngOnInit() {
    // TODO: hämta exjobb utifrån id och spara i examWork
    console.log(this.exWorkId);
  }

}
