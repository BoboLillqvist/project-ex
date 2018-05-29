import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { ExamWork } from '../../../models/exam-work.model';
import { Person } from '../../../models/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyService]
})
export class CompanyProfileComponent implements OnInit {

  company: Company;

  myProfile: boolean = false;

  constructor(private companyService: CompanyService,
              private router: Router,
              private auth: UserAuthService,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {

    this.company = new Company('', '', '',  []);

    let _id: string = this.route.snapshot.params['id'];

    if (_id === undefined) {
      _id = this.auth.getRoleId();
      this.myProfile = true;
    }

    this.companyService.getCompany(_id).subscribe( (resCompData: any) => {
      this.company = resCompData;
    });
  }

  goToExamWork(id) {
    let path;

    // who is looking at the profile?
    if (this.auth.getRole() === 'company') {
      path = '/company/exam-work/edit-exam-work/';
    } else {
      path = '/student/view-exam-work/';
    }

    path += id;
    this.router.navigateByUrl(path);
  }

  goToUrl() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.company.url)) {
        url += 'http://';
    }

    url += this.company.url;
    window.open(url, '_blank');
  }
}
