import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { Tags } from '../../tagsInput';
import { Course } from '../../models/course.model';
import { StudentService } from '../../student.service';
import { isNumber } from 'util';
import { Person } from '../../models/person.model';

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
  persons: Array<Student> = [];
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
  courses: Course[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.setUpYearList();
    // activate tags-input
    this.tags = new Tags(document);
  }

  // temp metod
  createMockStudent() {
    const stud = new Student('Jan', 'Jahn', 'Engineer', 2019, 'Doing work2',
                            ['c#', 'js'], [new Course('Course4', 7.5)], 'jahn@test.se', '070555111');
    this.addPerson(stud);
  }

  // skapa studenten utifrån formulär
  createStudent() {
    this.skills = this.tags.getData();
    if (this.courses.length === 0) {
     this.courses.push(new Course('Inga kurser tillagda', 0));
    }
    const student = new Student(this.fName, this.lName, this.education, this.examYear,
                                this.description, this.skills, this.courses, this.email, this.phoneNbr);
    this.addPerson(student);
  }

  // Startar kedjan med att lägga till en hel student.
  addPerson(stud: Student) {
    this.studentService.addPerson(stud.person).subscribe(resNewPerson => {
      stud.personId = resNewPerson._id;
      this.addCourses(stud);
    });
  }

  addCourses(stud: Student) {
    let i = 0;
    stud.courses.forEach(course => {
      this.studentService.addCourse(course).subscribe(resNewCourse => {
        stud.courseIds.push(resNewCourse._id);
        i++;
        if (i === stud.courses.length) {
          this.addStudent(stud);
        }
      });
    });
  }

  addStudent(stud: Student) {
    this.studentService.addStudent(stud).subscribe(resNewStudent => {
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
