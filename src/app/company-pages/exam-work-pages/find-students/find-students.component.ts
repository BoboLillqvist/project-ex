import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { StudentService } from '../../../student.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-find-students',
  templateUrl: './find-students.component.html',
  styleUrls: ['./find-students.component.scss'],
  providers: [StudentService]
})
export class FindStudentsComponent implements OnInit {

  Students: Array<Student>;
  Student: Student;
  StudentId: String;



  constructor(private studentService: StudentService, private route: ActivatedRoute) {
    // temporära hårdkodade students


  //   let Students = [
  //     new Student('Sven','Svensson','Maskiningenjör',2019,'Gillar att äta glass',
  //     ['Matematik','Fysik'],[new Course('Matematik I',7.5), new Course('Maskinteknik A',7.5)],
  //     'Sven_Svensson1337@hotmail.com','07013371337'),
  //     new Student('Zven','Svensson','Dataingenjör',2021,
  //     'Nånting nånting nånting hej hej hej tja',['C','Go','Rust','FORTRAN'],
  //     [new Course('Matematik I',7.5),new Course('Objektorienterad programmering',7.5)],
  //     'cool_grabb1717@yahoo.se','0707070707')
  // ]
   }

  onClickViewStudent() {
    this.StudentId = this.route.snapshot.params['id'];

  }


  ngOnInit() {
    this.studentService.getStudents().subscribe(resStudentData => {
      this.Students = resStudentData;
    });

  }





}
