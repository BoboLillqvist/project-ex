import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';
import { StudentService } from '../student.service';
import { Tags } from '../tagsInput';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentService]
})


export class StudentsComponent implements OnInit {

  tags: Tags;
  eduPrograms: string[] = [
    'Högskoleingenjör, datateknik',
  ];
  yearRange = [];
  students: Array<Student> = [];
  name: string;
  fName: string;
  lName: string;
  education: string;
  examYear: number;
  email: string;
  phoneNbr: string = '';
  description: string = '';
  skills: Array<string>;
  courseName: string;
  courses: Array<Course>;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.setUpYearList();
    // activate tags-input
    this.tags = new Tags(document);

    this.studentService.getStudents().subscribe(resStudentData => this.students = resStudentData);
    console.log(this.students);
  }

  addStudent() {
    this.skills = this.tags.getData();

    console.log(this.skills);

    const student = new Student(this.fName, this.lName, this.education, this.examYear,
                                this.description, this.skills, this.courses, this.email, this.phoneNbr);

    
    this.studentService.addStudent(student).subscribe(resNewStudent => {
      this.students.push(resNewStudent);
    });
  }

  addCourse() {
    this.courses.push(this.courseName);
    this.courseName = '';
  }

  removeCourse(index) {
    this.courses.splice(index, 1);
  }

  setUpYearList() {
    const year = new Date().getFullYear();
    this.yearRange.push(year);
    for (let i = 1; i < 6; i++) {
      this.yearRange.push(year + i);
    }
  }

}


