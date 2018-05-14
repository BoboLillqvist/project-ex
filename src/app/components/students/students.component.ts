import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentService],
})


export class StudentsComponent implements OnInit {

  students: Array<Student> = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(resStudentData => {
      this.students = resStudentData;
    });
//    document.getElementById('main-navbar').setAttribute('hidden', 'true');

  }


}


