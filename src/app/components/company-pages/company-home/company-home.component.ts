import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company.model';
import { UserAuthService } from '../../../services/user-auth.service';
import { ExamWork } from '../../../models/exam-work.model';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
  providers: [CompanyService,
  UserAuthService]
})
export class CompanyHomeComponent implements OnInit {

  constructor(private companyService: CompanyService, private userAuthService: UserAuthService) { }
  company = new Company("","","","");
  daysLefOfExamWork: Date;
  
  

DaysLeftOfExamwork(date){
  var message;
  console.log("datum" + date);
   var today = new Date();
   var expirationdate = new Date(date);
   console.log("exdate: " + expirationdate);
   var timeinmillisec = expirationdate.getTime() - today.getTime();
   console.log("today: " + today);


   if(timeinmillisec>0){
      message = Math.floor(timeinmillisec/(1000*60*60*24)) + " dagar kvar";
      return message;
      
   }

   else if(timeinmillisec<0){
     message = "Anmälan stängd";
     return message;

   }

   

  // var i;
  // var expirationdate = new Date(date);
  // console.log("Expdate: " + expirationdate);
  // var one_day = 1000*60*60*24;
  // this.daysLefOfExamWork = new Date(Math.ceil((expirationdate.getTime()-today.getTime())/(one_day)));
  // console.log("daysleft: " + this.daysLefOfExamWork);
  // return this.daysLefOfExamWork;
}



  ngOnInit() {
    document.body.style.backgroundImage = '';
    this.companyService.getCompany(this.userAuthService.getRoleId()).subscribe((resData: any)=>{
      console.log(this.userAuthService.getRoleId());
      this.company = resData;
    });
  }

}
