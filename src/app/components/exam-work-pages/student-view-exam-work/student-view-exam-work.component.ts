import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';

import { ExamWork } from '../../../models/exam-work.model';
import { ExamworkService } from '../../../services/examwork.service';
import { Person } from '../../../models/person.model';
import { Company } from '../../../models/company.model';
import { UserAuthService } from '../../../services/user-auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-student-view-exam-work',
  templateUrl: './student-view-exam-work.component.html',
  styleUrls: ['./student-view-exam-work.component.scss'],
  providers: [ExamworkService, UserAuthService]
})
export class StudentViewExamWorkComponent implements OnInit {

  exWorkId: String;
  examWork: ExamWork;
  user: User;

  constructor(private auth: UserAuthService, private route: ActivatedRoute, private examService: ExamworkService, private router: Router) {
    this.exWorkId = route.snapshot.params['id'];
    this.examWork= new ExamWork("","","",[],[],"","",new Person("", "", "", ""),"",new Company("", "", "", []));
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    this.examService.getExamWork(this.exWorkId).subscribe((resData: any)  => this.examWork = resData);
    
    //TODO: byt ut denna mot vem som är inloggad.
    if (document.URL.includes('student')) {
      this.user.role = 'student';
    } else {
      this.user.role = 'company';
    }
    
    this.goToPathBasedOnUserRole(this.user._id, this.exWorkId);
  }

  goToUrl() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.examWork.company.url)) {
        url += 'http://';
    }

    url += this.examWork.company.url;
    window.open(url, '_blank');
  }

goToPathBasedOnUserRole(roleId, exWorkId) {
  let path;
  if (this.user.role === 'company') {
    path = '/company/exam-work-dashboard/' + exWorkId;
    this.router.navigateByUrl(path);
  }
}

}
