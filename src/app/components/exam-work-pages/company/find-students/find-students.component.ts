import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student.model';
import { Course } from '../../../../models/course.model';
import { StudentService } from '../../../../services/student.service';


@Component({
  selector: 'app-find-students',
  templateUrl: './find-students.component.html',
  styleUrls: ['./find-students.component.scss'],
  providers: [StudentService]
})
export class FindStudentsComponent implements OnInit {

 students: Array<Student> = [];

 //TODO: Läs in den specifika examensarbetens essential skills.
 essSkills: Array<String> = ['C#'];

 constructor(private studentService: StudentService) {

  }

  
 ngOnInit() {
   this.studentService.getStudents().subscribe( resData => {
     this.students = resData;
   });
 }


}
