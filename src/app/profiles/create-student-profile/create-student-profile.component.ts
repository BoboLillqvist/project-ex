import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { Tags } from '../../tagsInput';
import { Course } from '../../models/course.model';
import { StudentService } from '../../student.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrls: ['./create-student-profile.component.scss'],
  providers: [StudentService],
})
export class CreateStudentProfileComponent implements OnInit {

  tags: Tags;
  eduPrograms: string[] = [
    'Högskoleingenjör, datateknik',
  ];
  yearRange = [];
  students: Array<Student> = [];
  fName: string;
  lName: string;
  education: string;
  examYear: number;
  email: string;
  phoneNbr: string = '';
  description: string = '';
  skills: Array<string>;
  courseName: string;
  coursePoints: number;
  courses: Array<Course> = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.setUpYearList();
    // activate tags-input
    this.tags = new Tags(document);

    this.studentService.getStudents().subscribe(resStudentData => this.students = resStudentData);
  }

  addStudent() {
    this.skills = this.tags.getData();

    const student = new Student(this.fName, this.lName, this.education, this.examYear,
                                this.description, this.skills, this.courses, this.email, this.phoneNbr);

    this.studentService.addStudent(student).subscribe(resNewStudent => {
      this.students.push(resNewStudent);
    });
  }

  onPointsChange() {
    const point = this.coursePoints.toString().replace(',', '.');
    if (point.length > 0) {
      this.coursePoints = parseFloat(point);
      document.getElementById('addCourseLabel').firstChild.nodeValue = 'Lägg till kurser - Tryck enter för att lägga till!';
    } else {
      document.getElementById('addCourseLabel').firstChild.nodeValue = 'Lägg till kurser';
    }
  }

  addCourse() {
    if (!isFinite(this.coursePoints)) {
      document.getElementById('addCourseLabel').firstChild.nodeValue = 'Lägg till kurser - Poäng ej korrekt';
    } else {
      this.courses.push(new Course(this.courseName, this.coursePoints));
      this.courseName = '';
      document.getElementById('addCourseLabel').firstChild.nodeValue = 'Lägg till kurser';
    }
    document.getElementById('courseInput').focus();
    this.coursePoints = undefined;
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
