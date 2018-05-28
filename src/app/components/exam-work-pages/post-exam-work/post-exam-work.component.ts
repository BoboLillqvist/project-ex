import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExamWork } from '../../../models/exam-work.model';
import { Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { ExamworkService } from '../../../services/examwork.service';
import { PersonService } from '../../../services/person.service';
import { AddStudentSkillsComponent } from './add-student-skills/add-student-skills.component';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../../../services/user-auth.service';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-post-exam-work',
  templateUrl: './post-exam-work.component.html',
  styleUrls: ['./post-exam-work.component.scss'],
  providers: [
    ExamworkService,
    PersonService,
    ToastrService,
    CompanyService
  ]
})
export class PostExamWorkComponent implements OnInit {

  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild(AddStudentSkillsComponent) studentSkillsComponent: AddStudentSkillsComponent;

  fName: string;
  lName: string;
  phoneNbr: string;
  email: string;

  personId: string;
  examWork: ExamWork;

  constructor(
    private examWorkService: ExamworkService,
    private personService: PersonService,
    private compServ: CompanyService,
    private router: Router,
    private toastr: ToastrService,
    private auth: UserAuthService
  ) { }

  ngOnInit() {
    console.log('oninit??');
  }

  onSubmitAddExamWork(examWork: ExamWork) {
    this.examWork = examWork;
    this.addTagsFromAddStudentSkillsComponent(this.examWork);
    this.createPerson();
  }

  clearValues() {
    this.myForm.resetForm();
  }

  addTagsFromAddStudentSkillsComponent(examWork: any) {
    examWork.essentialSkills  = this.studentSkillsComponent.storedTags.essentials;
    examWork.complementarySkills  = this.studentSkillsComponent.storedTags.complimentary;
  }

  createPerson() {
    const contact = new Person(this.fName, this.lName, this.email, this.phoneNbr);

    // skapa person
    this.personService.addPerson(contact).subscribe((resData: any) => {
      // spara undan id
      this.personId = resData._id;
      this.createExamWork();

    });
  }

  createExamWork() {
    const newExamWork = new ExamWork(
      this.examWork.title,
      this.examWork.location,
      this.examWork.essentialSkills,
      this.examWork.complementarySkills,
      this.examWork.description,
      this.examWork.applyDueDate,
      null,
      null,
      this.examWork.teachings,
      null
    );

    // lagra korrekt id:s på nytt examwork
    newExamWork.contactId = this.personId;
    newExamWork.companyId = this.auth.getRoleId();

    // lägg till examwork i db
    this.examWorkService.addExamWork(newExamWork).subscribe((resWork: any) => {

      // spara undan id
      const workId = resWork._id;

      // hämta inloggat företag
      this.compServ.getCompany(this.auth.getRoleId()).subscribe( (resComp: any) => {

        let company = new Company('', '', '', []);

        company = resComp;

        // lägg till examwork i listan
        company.examWorks.push(resWork);

        // uppdatera företag så nya listan läggs till
        this.compServ.updateExamworkList(company).subscribe( (resCompUpdated: any) => {
          this.sendUserBack();
        });

      });

    });
  }

  sendUserBack() {
    this.toastr.success('Examensarbetet är nu publicerat!');
    this.router.navigate(['/company/home']);
  }
}
