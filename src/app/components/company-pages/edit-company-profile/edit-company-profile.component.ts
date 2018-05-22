import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { Person } from '../../../models/person.model';
import { Router } from '@angular/router';
import { ImageUploadComponent } from '../../file-upload/image-upload/image-upload.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.scss'],
  providers: [CompanyService, ToastrService]
})
export class EditCompanyProfileComponent implements OnInit {

  @ViewChild(ImageUploadComponent) imageUpload;
  
  company: Company;
  contact: Person;

  backupCompany: Company;
  backupContact: Person;

  constructor(
    private compServ: CompanyService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.company = new Company('ÖRebro uni', 'Bra uni du vet', 'https://oru.se', []);
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

  changePicture(){
    if(this.imageUpload.url != ''){
      this.company.pictureURL = this.imageUpload.url;
    }
  }

  updateCompany() {
    this.changePicture();
    this.compServ.updateCompany(this.company).subscribe( resData => {
      this.company = resData;

      this.toastr.success('Företagets profil har uppdaterats!');
      this.router.navigate(['/company/profile']);
    });
  }

  cancelEdit() {
    this.company = Object.assign({}, this.backupCompany);
    this.contact = Object.assign({}, this.backupContact);
    this.router.navigate(['/company/profile']);
  }

  goToManageExamWorks() {
    this.router.navigate(['/company/home/']);
  }

}
