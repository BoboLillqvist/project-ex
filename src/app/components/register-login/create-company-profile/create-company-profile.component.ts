import { Component, ViewChild, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { NgForm } from '@angular/forms';
import { ImageUploadComponent } from '../../file-upload/image-upload/image-upload.component';


@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.scss'],
  providers: [CompanyService]
})
export class CreateCompanyProfileComponent implements OnInit {

  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild(ImageUploadComponent) imageUpload;

  constructor(private companyService: CompanyService) { }
  
  ngOnInit() {
  }

  onSubmitAddCompany(company: Company){
    console.log(company.name);
    console.log(company.url);
    console.log(company.description);
    console.log(company.pictureID);
    console.log(company.pictureURL);
    company.pictureID = this.imageUpload.id;
    company.pictureURL = this.imageUpload.url;

    if(company.pictureURL == ''){
      company.pictureURL = 'https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/company.png?alt=media&token=3d5807b0-e6b5-4d66-8c05-b7f36c6360e5';
    }
    this.companyService.addCompany(company)
    .subscribe();

    this.clearValues();
  }

  clearValues() {
    this.myForm.resetForm();
  }

}
