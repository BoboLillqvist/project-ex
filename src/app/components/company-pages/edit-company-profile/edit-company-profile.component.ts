import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.scss']
})
export class EditCompanyProfileComponent implements OnInit {

  constructor() { }
  company: Company;
  contact: Person;

  backupCompany: Company;
  backupContact: Person;


  ngOnInit() {
  }

}
