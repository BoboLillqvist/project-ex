import { Component, OnInit } from '@angular/core';
import { ExamWork } from '../models/exam-work.model';
import { Person } from '../models/person.model';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "First contact";

  examWork1 = new ExamWork("Program för schemadesign","Örebro",["HTML","CSS","Javascript"],["PHP"],"Erbjudande om examensarbete: Att utveckla och programmera ett program för design av veckoscheman för kurser vid institutionen av Naturvetenskap och teknik. Lämplig gruppstorlek är 1-2 studenter.", new Date("2018-04-23"),"5 dagar i veckan",new Person("Sven","Svensson","Sven_Svensson@yahoo.se","073-4334255"),"nånting",new Company("Apple","Apple Sverige","www.apple.se/about",[this]));
  examWork2 = new ExamWork("MobileRobotic Telepresence Research Platform","Örebro",["C","Van att jobba i linuxmiljö"],["C++"],"Vid intresse, kontakta: [mejl]", new Date("2018-08-20"),"5 dagar i veckan",new Person("Sven","Svensson","Sven_Svensson@yahoo.se","073-4334255"),"nånting",new Company("MRTRP","hurrdurr","www.mobilerobotics.com/about",[this]));
  examWorks = [this.examWork1,this.examWork2];
  

  constructor() { }

  ngOnInit() {
  }

}
