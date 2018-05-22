import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { ExamworkService } from '../../../../services/examwork.service';
import { ProgressBarComponent } from '../../../misc/progress-bar/progress-bar.component';
import * as moment from 'moment';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student.model';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-exam-work-dashboard',
  templateUrl: './exam-work-dashboard.component.html',
  styleUrls: ['./exam-work-dashboard.component.scss'],
  providers: [ExamworkService,StudentService]
})
export class ExamWorkDashboardComponent implements OnInit {
  @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;

  examWorkId: String;
  examWork: ExamWork;
  students: Array<Student> = [];
  user: User;
  constructor(
    private examService: ExamworkService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.examWorkId = this.activatedRoute.snapshot.params['id'];
    this.examWork = new ExamWork('', '', '', [], [], '', '',
                                 new Person('', '', '', ''), '',
                                 new Company('', '', '', [])
    );
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    this.examService.getExamWork(this.examWorkId)
      .subscribe(fetchedExamWork => this.examWork = fetchedExamWork);
    this.studentService.getStudents()
      .subscribe(fetchedStudents => this.students = fetchedStudents);

       //TODO: byt ut denna mot vem som är inloggad.
       if (document.URL.includes('company')) {
        this.user.role = 'company';
      } else {
        this.user.role = 'student';
      }
    this.goToPathBasedOnUserRole(this.user._id, this.examWorkId)
    console.log(this.examWork);
  }

  goToPathBasedOnUserRole(roleId, exWorkId) {
    let path;
    if (this.user.role === 'student') {
      path = '/student/view-exam-work/' + exWorkId;
      this.router.navigateByUrl(path);
    }
  }
}
