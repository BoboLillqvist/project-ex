import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { ExamworkService } from '../../../../services/examwork.service';
import { ProgressBarComponent } from '../../../misc/progress-bar/progress-bar.component';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-work-dashboard',
  templateUrl: './exam-work-dashboard.component.html',
  styleUrls: ['./exam-work-dashboard.component.scss'],
  providers: [ExamworkService]
})
export class ExamWorkDashboardComponent implements OnInit {
  @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;

  examWorkId: String;
  examWork: ExamWork;

  constructor(
    private examService: ExamworkService,
    private activatedRoute: ActivatedRoute
  ) {
    this.examWorkId = this.activatedRoute.snapshot.params['id'];
    this.examWork = new ExamWork('', '', '', [], [], '', '',
                                 new Person('', '', '', ''), '',
                                 new Company('', '', '', [])
    );
  }

  ngOnInit() {
    this.examService.getExamWork(this.examWorkId)
      .subscribe(fetchedExamWork => this.examWork = fetchedExamWork);
  }
}
