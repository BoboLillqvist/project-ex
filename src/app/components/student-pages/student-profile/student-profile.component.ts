import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';
import { Course } from '../../../models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [StudentService],
})
export class StudentProfileComponent implements OnInit {

  student: Student;

  constructor(private studService: StudentService, private route: ActivatedRoute) {
    this.student = new Student('', '', '', 0, '', [], [], '', '');
    // TODO: hämta in student/student id från någonstans. Kanske kan hamna i någon Auth service vid login?
    let studId: string = this.route.snapshot.params['id'];  // tar in hårdkodat id just nu
    if (studId === 'profile') {
      studId = this.studService._id;
    }
      
      
    this.studService.getStudent(studId).subscribe(resStudentData => this.student = resStudentData);
  }

  ngOnInit() {
  }

}
