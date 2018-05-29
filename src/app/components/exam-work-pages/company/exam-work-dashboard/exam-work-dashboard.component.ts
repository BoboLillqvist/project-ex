import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { ExamworkService } from '../../../../services/examwork.service';
import { ProgressBarComponent } from '../../../misc/progress-bar/progress-bar.component';
import * as moment from 'moment';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student.model';
import { SimpleTagComponent } from '../../../misc/simple-tag/simple-tag.component';
import { User } from '../../../../models/user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Location } from '@angular/common';

@Component({
 selector: 'app-exam-work-dashboard',
 templateUrl: './exam-work-dashboard.component.html',
 styleUrls: ['./exam-work-dashboard.component.scss'],
 providers: [ExamworkService, StudentService]
})
export class ExamWorkDashboardComponent implements OnInit {
 @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;
 @ViewChild(SimpleTagComponent) tagComp;

 examWorkId: String;
 examWork: ExamWork;
 students: Array<Student> = [];
 sortedStudents: Array<Student> = [];
 showLimit: number = 5;
 showMoreBtn: boolean = false;
 tagSkills: Array<String> = [];

 //variabler till ta bort funktion
 modalRef: BsModalRef;
 message: String;

 user: User;
 constructor(
   private examService: ExamworkService,
   private studentService: StudentService,
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private modalService: BsModalService,
   private location: Location
 ) {
   this.examWorkId = this.activatedRoute.snapshot.params['id'];
   this.examWork = new ExamWork('', '', [], [], '', '', '',
   new Person('', '', '', ''), '',
   new Company('', '', '', [])
);
      
   this.user = new User('', '', '', '','');
 }

//metoder till ta bort funktion
 openModal(template: TemplateRef<any>){
   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
 }

 confirm(): void {
   this.message = 'Confirmed';
   this.modalRef.hide();

<<<<<<< HEAD
    this.examService.getExamWork(this.examWorkId)
      .subscribe((fetchedExamWork: any) => {
  
        this.examWork = fetchedExamWork;
        for(let i = 0; i < this.examWork.essentialSkills.length; i++) {
            this.tagComp.skills.push(this.examWork.essentialSkills[i]);
        }
          
        this.tagSkills = this.tagComp.skills;
      });
    this.studentService.getStudents()
      .subscribe(((fetchedStudents: any) => {
        this.students = fetchedStudents;
        this.sortedStudents = fetchedStudents;

    }));

       //TODO: byt ut denna mot vem som är inloggad.
       if (document.URL.includes('company')) {
        this.user.role = 'company';
      } else {
        this.user.role = 'student';
      }
    this.goToPathBasedOnUserRole(this.user._id, this.examWorkId)
    console.log(this.examWork);
  }

  // showMoreStudents()
  // {
  //   this.showLimit += 5;
  //   if(this.showLimit > this.sortedStudents.length)
  //     this.showMoreBtn = false;

  // }

  // sortStudents()
  // {
  //   this.isEmpty = false;
  updateSkills(){
    this.tagSkills = [];
    this.tagSkills = this.tagComp.skills;

  //   this.students.forEach(student => {
  //     this.tagComp.skills.forEach(skill => {    
  //       student.skills.forEach(essSkill => {
  //         if(skill === essSkill)
  //           this.sortedStudents.push(student);
  //       });
  //     });
  //   });

  //   if (this.sortedStudents.length < 1)
  //     this.isEmpty = true;
  //   else if (this.sortedStudents.length < this.showLimit)
  //     this.showMoreBtn = false;
  //   else
  //     this.showMoreBtn = true;


  // }

  goToPathBasedOnUserRole(roleId, exWorkId) {
    let path;
    if (this.user.role === 'student') {
      path = '/student/view-exam-work/' + exWorkId;
      this.router.navigateByUrl(path);
=======
   this.deleteExamWork(this.examWork);
   this.location.back();

 }

 decline(): void {
   this.message = 'Declined';
   this.modalRef.hide();
 }

 deleteExamWork(examWork: ExamWork){
   this.examService.deleteExamWork(examWork)
    .subscribe((res: any) => {
    });

 }

 getExamWork(){
  this.examService.getExamWork(this.examWorkId)
  .subscribe((fetchedExamWork: any) => {
    this.examWork = fetchedExamWork;

    //Initiera tags med examensarbetens essentialskills
    for(let i = 0; i < this.examWork.essentialSkills.length; i++) {
        this.tagComp.skills.push(this.examWork.essentialSkills[i]);
>>>>>>> 17798207f01b805fa091b56b49164cc0a2ddc1f8
    }
     
    this.tagSkills = this.tagComp.skills;
  });
 }

 getAllStudents(){
       
  this.studentService.getStudents()
  .subscribe(((fetchedStudents: any) => {
    this.students = fetchedStudents;
    this.sortedStudents = fetchedStudents;

}));
 }

 ngOnInit() {
  
    this.getExamWork();

    this.getAllStudents();

      //TODO: byt ut denna mot vem som är inloggad.
      if (document.URL.includes('company')) {
       this.user.role = 'company';
     } else {
       this.user.role = 'student';
     }
   this.goToPathBasedOnUserRole(this.user._id, this.examWorkId)

 }

 showMoreStudents() {
  this.showLimit += 5;

}

 updateSkills(){
   this.tagSkills = [];
   this.tagSkills = this.tagComp.skills;
 }

 goToPathBasedOnUserRole(roleId, exWorkId) {
   let path;
   if (this.user.role === 'student') {
     path = '/student/view-exam-work/' + exWorkId;
     this.router.navigateByUrl(path);
   }
 }
}



