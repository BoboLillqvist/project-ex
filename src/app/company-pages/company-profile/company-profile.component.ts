import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  goToUrl() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.company.url)) {
        url += 'http://';
    }

    url += this.company.url;
    window.open(url, '_blank');
  }

  goToExamWork(index) {
    this.router.navigate(['student/view-exam-work']);
  }

}
