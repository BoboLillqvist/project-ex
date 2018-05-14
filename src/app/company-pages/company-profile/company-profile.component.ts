import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { ExamWork } from '../../models/exam-work.model';
import { Person } from '../../models/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyService]
})
export class CompanyProfileComponent implements OnInit {

  company: Company;
  contact: Person;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    // för ng serve develop
    this.contact = new Person('Monti', 'Berg', 'montiberg321@ggcorp.co', '070555111');


    this.company = new Company('', '', '', []);

    const _id = this.companyService._id;

    this.companyService.getCompany(_id).subscribe( resCompData => this.company = resCompData);
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
