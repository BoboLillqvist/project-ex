import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { StudentService } from '../../../services/student.service';


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

//  Students = [
//   new Student('Sven','Svensson','Maskiningenjör',2019,'Gillar att äta glass',
//   ['Matematik','Fysik'],[new Course('Matematik I',7.5), new Course('Maskinteknik A',7.5)],
//   'Sven_Svensson1337@hotmail.com','07013371337'),
//   new Student('Zven','Svensson','Dataingenjör',2021,
//   'Nånting nånting nånting hej hej hej tja',['C','Go','Rust','FORTRAN'],[new Course('Matematik I',7.5),new Course('Objektorienterad programmering',7.5)],
//   'cool_grabb1717@yahoo.se','0707070707')
// ]
 constructor(private studentService: StudentService) {

  }

  
 ngOnInit() {
   this.studentService.getStudents().subscribe( resData => {
     this.students = resData;
   });
 }


}
