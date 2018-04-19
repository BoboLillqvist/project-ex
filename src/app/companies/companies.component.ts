import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [CompanyService]
})
export class CompaniesComponent implements OnInit {

  companies: Array<Company>;

  constructor(private _companyService: CompanyService) { }

  //TODO:: resten av CRUD operationerna
  ngOnInit() {
    this._companyService.getCompanies()
      .subscribe(resComanyData => this.companies = resComanyData);
  }

}
