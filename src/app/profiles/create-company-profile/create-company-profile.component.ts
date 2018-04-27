import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss']
  styleUrls: ['./create-company-profile.component.scss'],
  providers: [CompanyService]
})
export class CreateCompanyProfileComponent implements OnInit {

  constructor() { }

  constructor(private companyService: CompanyService) { }
  
  ngOnInit() {
  }

}
