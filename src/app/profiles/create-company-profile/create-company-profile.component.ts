import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss'],
  providers: [CompanyService]
})
export class CreateCompanyProfileComponent implements OnInit {


  constructor(private companyService: CompanyService) { }
  
  ngOnInit() {
  }

  onSubmitAddCompany(company: Company){
    console.log(company.name);
    console.log(company.url);
    console.log(company.description);
    this.companyService.addCompany(company)
    .subscribe();
  }
}
