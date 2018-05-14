import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamworkService } from '../examwork.service';
import { PersonService } from '../person.service';
import { ExamWork } from '../models/exam-work.model';
import { NgForm } from '@angular/forms';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';
import { AddStudentSkillsComponent } from './add-student-skills/add-student-skills.component';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-post-exam-work',
  templateUrl: './post-exam-work.component.html',
  styleUrls: ['./post-exam-work.component.scss'],
  providers: [
    ExamworkService,
    PersonService,
    NotificationService
  ]
})
export class PostExamWorkComponent implements OnInit {

  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild(AddStudentSkillsComponent) studentSkillsComponent: AddStudentSkillsComponent;

  fName: string;
  lName: string;
  phoneNbr: string;
  email: string;

  constructor(
    private examWorkService: ExamworkService,
    private personService: PersonService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  onSubmitAddExamWork(examWork: ExamWork) {
    this.addTagsFromAddStudentSkillsComponent(examWork);
    this.createPerson(this.personService);
    this.createExamWork(this.examWorkService, examWork);

    // Store success for notification
    this.notificationService.notify('Examensarbetet är publicerat!', 'success');

    this.sendUserBack();
  }

  clearValues() {
    this.myForm.resetForm();
  }

  addTagsFromAddStudentSkillsComponent(examWork: any) {
    examWork.essentialSkills  = this.studentSkillsComponent.storedTags.essentials;
    examWork.complementarySkills  = this.studentSkillsComponent.storedTags.complimentary;
  }

  createPerson(personService: PersonService) {
    const contact = new Person(this.fName, this.lName, this.email, this.phoneNbr);

    // TODO: Kolla om användaren finns, isf hämta
    personService.addPerson(contact).subscribe();
  }

  createExamWork(examWorkService: ExamworkService, examWork: any) {
    const newExamWork = new ExamWork(
      examWork.title,
      examWork.location,
      examWork.essentialSkills,
      examWork.complementarySkills,
      examWork.description,
      examWork.applyDueDate,
      null, // Contact
      null, // Company
      'precense',
      examWork.teachings
    );

    examWorkService.addExamWork(newExamWork).subscribe();
  }

  sendUserBack() {
    this.router.navigate(['/company/home']);
  }
}
