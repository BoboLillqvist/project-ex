import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamworkService } from '../../services/examwork.service';
import { ExamWork } from '../../models/exam-work.model';
import { NgForm } from '@angular/forms';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-post-exam-work',
  templateUrl: './post-exam-work.component.html',
  styleUrls: ['./post-exam-work.component.scss'],
  providers: [ExamworkService]
})
export class PostExamWorkComponent implements OnInit {

  @ViewChild(NgForm) myForm: NgForm;

  fName: string;
  lName: string;
  phoneNbr: string;
  email: string;


  constructor(private examWorkService: ExamworkService) { }

  ngOnInit() {
  }

  onSubmitAddExamWork(examWork: ExamWork){

    this.createPerson(examWork);

    console.log("titel: " + examWork.title);
    console.log("ort: " + examWork.location);
    console.log("datum: " + examWork.applyDueDate);
    console.log("ess.skills: " + examWork.essentialSkills);
    console.log("comp.skills: " + examWork.complementarySkills);
    console.log("beskrivning: " + examWork.description);
    console.log("lärdomar: " + examWork.teachings);
    console.log("company: " + examWork.company);
    
    this.examWorkService.addExamWork(examWork)
    .subscribe();

    this.clearValues()
  }

  clearValues() {
    this.myForm.resetForm();
  }

  createPerson(examWork: ExamWork){
    const contact = new Person(this.fName, this.lName,this.email, this.phoneNbr);
    console.log("kontaktperson: " + contact);
    return contact;
  }
}
