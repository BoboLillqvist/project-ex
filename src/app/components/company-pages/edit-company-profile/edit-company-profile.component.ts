import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { Person } from '../../../models/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.scss'],
  providers: [CompanyService]
})
export class EditCompanyProfileComponent implements OnInit {

  company: Company;
  contact: Person;

  backupCompany: Company;
  backupContact: Person;

  constructor(private compServ: CompanyService, private router: Router) {
    this.company = new Company('ÖRebro uni', 'Bra uni du vet', 'https://oru.se', [], 'http://via.placeholder.com/140x140');
    this.contact = new Person('', '', '', '');
  }

  ngOnInit() {
    // hårdkodat id hämtas nu
    const _id = this.compServ._id;

    this.compServ.getCompany(_id).subscribe(resData => {
      this.company = resData;

      // deep copy
      this.backupCompany = Object.assign({}, this.company);
      this.backupContact = Object.assign({}, this.contact);
    });
  }

  updateCompany() {
    this.compServ.updateCompany(this.company).subscribe( resData => {
      this.company = resData;
      this.router.navigate(['/company/profile']);
    });
  }

  cancelEdit() {
    this.company = Object.assign({}, this.backupCompany);
    this.contact = Object.assign({}, this.backupContact);
    this.router.navigate(['/company/profile']);
  }

  goToManageExamWorks() {
    // TODO: Fixa en sida där företagen kan överblicka sina arbeten, men knappar för redigera, ta bort osv.
    //this.router.navigate(['/company/exam-works/']);
  }

}
