import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../student.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [StudentService],
})
export class StudentProfileComponent implements OnInit {

  student: Student;

  constructor(private studService: StudentService) {
    // temp student för dev
    // const desc = 'I enjoy long walks on the beach and coding sessions that last deep into the night. I also enjoy baking bread.';
    // this.student = new Student('Jan', 'Jahn', 'Högskoleingenjör, datateknik', 2019, desc, ['c#', 'js'],
    //                             [new Course('Programmeringsmetodik', 7.5), new Course('Digitalteknik', 7.5)],
    //                             'jahn@test.se', '070555111');

    // TODO: hämta in student/student id från någonstans. Kanske kan hamna i någon Auth service vid login?
    const studId = this.studService._id;  // tar in hårdkodat id just nu
    this.studService.getStudent(studId).subscribe(resStudentData => this.student = resStudentData);
  }

  ngOnInit() {
  }

}
