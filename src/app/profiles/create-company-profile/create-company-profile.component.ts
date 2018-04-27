import { Component, ViewChild, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';
import { Company } from '../../models/company.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss'],
  providers: [CompanyService]
})
export class CreateCompanyProfileComponent implements OnInit {

  @ViewChild(NgForm) myForm: NgForm;

  constructor(private companyService: CompanyService) { }
  
  ngOnInit() {
  }

  onSubmitAddCompany(company: Company){
    console.log(company.name);
    console.log(company.url);
    console.log(company.description);
    this.companyService.addCompany(company)
    .subscribe();

    this.clearValues();
  }

  clearValues() {
    this.myForm.resetForm();
  }

}
