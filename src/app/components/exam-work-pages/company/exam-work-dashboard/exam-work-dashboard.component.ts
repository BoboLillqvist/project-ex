import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { ExamworkService } from '../../../../services/examwork.service';
import { ProgressBarComponent } from '../../../misc/progress-bar/progress-bar.component';
import * as moment from 'moment';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student.model';
import { SimpleTagComponent } from '../../../misc/simple-tag/simple-tag.component';

@Component({
  selector: 'app-exam-work-dashboard',
  templateUrl: './exam-work-dashboard.component.html',
  styleUrls: ['./exam-work-dashboard.component.scss'],
  providers: [ExamworkService,StudentService]
})
export class ExamWorkDashboardComponent implements OnInit {
  @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;
  @ViewChild(SimpleTagComponent) tagComp;

  examWorkId: String;
  examWork: ExamWork;
  students: Array<Student> = [];
  sortedStudents: Array<Student> = [];
  isEmpty: boolean = false;
  showLimit: number = 5;
  showMoreBtn: boolean = false;

  constructor(
    private examService: ExamworkService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.examWorkId = this.activatedRoute.snapshot.params['id'];
    this.examWork = new ExamWork('', '', [], [], '', '', '',
    new Person('', '', '', ''), '',
    new Company('', '', '', [])
);
        

  }

  ngOnInit() {


    this.examService.getExamWork(this.examWorkId)
      .subscribe((fetchedExamWork) => {
  
        this.examWork = fetchedExamWork;
       for(let i = 0; i < this.examWork.essentialSkills.length; i++)
        this.tagComp.skills.push(this.examWork.essentialSkills[i]);

      });
    this.studentService.getStudents()
      .subscribe((fetchedStudents => {
        this.students = fetchedStudents;
        this.sortedStudents = fetchedStudents;

    }));

  }

  showMoreStudents()
  {
    this.showLimit += 5;
    if(this.showLimit > this.sortedStudents.length)
      this.showMoreBtn = false;

  }

  sortStudents()
  {
    this.isEmpty = false;

    this.students = [];

    this.students.forEach(student => {
      this.tagComp.skills.forEach(skill => {    
        student.skills.forEach(essSkill => {
          if(skill === essSkill)
            this.sortedStudents.push(student);
        });
      });
    });

    if (this.sortedStudents.length < 1)
      this.isEmpty = true;
    else if (this.sortedStudents.length < this.showLimit)
      this.showMoreBtn = false;
    else
      this.showMoreBtn = true;

  }
}
