import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { StudentService } from '../../../services/student.service';
import { isNumber } from 'util';
import { Person } from '../../../models/person.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { PersonService } from '../../../services/person.service';
import { SimpleTagComponent } from '../../misc/simple-tag/simple-tag.component';
import { ImageUploadComponent } from '../../file-upload/image-upload/image-upload.component';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrls: ['./create-student-profile.component.scss'],
  providers: [StudentService, PersonService],
})
export class CreateStudentProfileComponent implements OnInit {

  @ViewChild(NgForm) studentForm: NgForm;

  eduPrograms: string[] = [];
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
  skills:  string[] = [];
  courseName: string;
  coursePoints: number;
  courses: Array<Course> = [];

  @ViewChild(SimpleTagComponent) studentSkills;
  @ViewChild(ImageUploadComponent) imageUpload;

  constructor(private studentService: StudentService, private personService: PersonService) {
    this.eduPrograms = studentService.eduPrograms;
   }

  ngOnInit() {
    this.setUpYearList();
  }

  // skapa studenten utifrån formulär
  createStudent() {
    if (this.courses.length === 0) {
      // tror post routen ballar ur just nu om ingen kurs kommer med
      this.courses.push(new Course('Inga kurser tillagda', 0));
    }

    this.skills = this.studentSkills.skills;

    const student = new Student(this.fName, this.lName, this.education,
                                this.examYear, this.description, this.skills,
                                this.courses, this.email, this.phoneNbr
    );
    student.pictureID = this.imageUpload.id;
    this.addPerson(student);
  }

  // Startar kedjan med att lägga till en hel student.
  addPerson(stud: Student) {
    this.personService.addPerson(stud.person).subscribe(resNewPerson => {
      // spara en kopia av det id som personen fått av mongoose
      stud.personId = resNewPerson._id;

      // personen är tillagd, dags att lägga till kurser
      this.addCourses(stud);
    });
  }

  // lagra alla kurser
  // Ser lite konstigt ut med flera i++ och this.readyToAddStudent calls, 
  // men det är för koden utanför subscribe fortsätter att exekvera av någon anledning
  addCourses(stud: Student) {
    let i = 0;
    stud.courses.forEach(course => {
      // kolla om kurs finns i databas
      this.studentService.getCourse(course.name).subscribe(resCourse => {
        if (resCourse != null) {
          console.log('Kurs fanns: ' + resCourse.name);
          stud.courseIds.push(resCourse._id);
          i++;
          this.readyToAddStudent(stud, i);
        } else {
          this.studentService.addCourse(course).subscribe(resNewCourse => {
            // spara en kopia av det id som kursen har fått av mongoose
            stud.courseIds.push(resNewCourse._id);
            i++;
            this.readyToAddStudent(stud, i);
          });
        }
      });
    });
  }

  readyToAddStudent(stud: Student, index) {
    if (index === stud.courses.length) {
      // alla kurser är inlagda i databasen, dags att lägga till studenten
      this.addStudent(stud);
    }
  }

  // och tillsist lagra studenten med korrekta referenser till det som skapats innan
  addStudent(stud: Student) {
    this.studentService.addStudent(stud).subscribe(resNewStudent => {
      this.students.push(resNewStudent);
    });
  }

  onPointsChange() {
    const point = this.coursePoints.toString().replace(',', '.');
  }

  addCourseToStudent() {
    this.courses.push(new Course(this.courseName, this.coursePoints));
    this.courseName = '';
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
