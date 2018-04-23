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
  students: Array<Student>;
  name: string;
  education: string;
  examYear: number;
  email: string;
  phoneNbr: string;
  description: string;
  skills: Array<string>;
  courses: Array<Course>;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.setUpYearList();

    // activate tags-input
    this.tags = new Tags(document);
    
   // this.skills = tags.tags;

    //this.studentService.getStudents().subscribe(resStudentData => this.students = resStudentData);
  }


  addStudent() {
    console.log(this.name);
    console.log(this.education);
    console.log(this.examYear);
    console.log(this.email);
    console.log(this.phoneNbr);
    console.log(this.description);

    // hämta och dela upp skillsen
    this.skills = this.tags.getData();

    console.log(this.skills);
    console.log(this.courses);
  }

  setUpYearList() {
    const year = new Date().getFullYear();
    this.yearRange.push(year);
    for (let i = 1; i < 6; i++) {
      this.yearRange.push(year + i);
    }
  }

}
