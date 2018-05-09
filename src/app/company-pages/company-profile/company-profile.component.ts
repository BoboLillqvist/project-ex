import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../company.service';
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
    const ew = [new ExamWork('Work1', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', ''),
                new ExamWork('Work2', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', ''),
                new ExamWork('Work3', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', ''),
                new ExamWork('Work4', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', ''),
                new ExamWork('Work5', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', ''),
                new ExamWork('Work6', 'Örebro', ['c#', 'js'], ['.net'], 'do this and that', Date.now, '100%', '', '', '')];
    // this.company = new Company('GG Corp', 'ggnore. dslöfkaöls afaödsf asf öasf alsö asdf a aio aweihfiu asiudhf alks', 'http://gg.co', ew);

    this.company = new Company('', '', '', []);
    const _id = this.companyService._id;
    this.companyService.getCompany(_id).subscribe( resCompData => {
      this.company = resCompData;
      this.company.examWorks = ew;
    });
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
