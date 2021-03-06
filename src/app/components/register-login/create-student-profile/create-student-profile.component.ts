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
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { RegisterLoginComponent } from '../register-login/register-login.component';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrls: ['./create-student-profile.component.scss'],
  providers: [StudentService, PersonService],
})
export class CreateStudentProfileComponent implements OnInit {

  @ViewChild(NgForm) studentForm: NgForm;
  @ViewChild('registerForm') regform: RegisterLoginComponent;

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
  user: any;

  @ViewChild(SimpleTagComponent) studentSkills;
  @ViewChild(ImageUploadComponent) imageUpload;

  constructor(private studentService: StudentService,
              private personService: PersonService,
              private courseService: CourseService,
              private router: Router) {
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
    student.pictureURL = this.imageUpload.url;

    // om ingen profilbild valts sätt profilbild till standard avatar
    if(student.pictureURL === ''){
      student.pictureURL = 'https://firebasestorage.googleapis.com/v0/b/firstcontact-3ad7f.appspot.com/o/avatar.png?alt=media&token=8b5b1092-ab8d-4df4-b923-11ae01c6ca3b';
    }

    // try to create user
    this.regform.register(student.name, (data) => {
      console.log(data);
      // username already exists
      if (data.status === 406) {
        // do something
      } else {
        // start the create student chain
        console.log('start chain');
        this.user = data.user;
        this.addPerson(student);
      }
    });
  }

  // Startar kedjan med att lägga till en hel student.
  addPerson(stud: Student) {
    this.personService.addPerson(stud.person).subscribe((resNewPerson: any) => {
      // spara en kopia av det id som personen fått av mongoose
      stud.personId = resNewPerson._id;
      stud.person = resNewPerson;

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
      this.courseService.getCourse(course.name).subscribe((resCourse: any) => {
        if (resCourse != null) {
          console.log('Kurs fanns: ' + resCourse.name);
          stud.courseIds.push(resCourse._id);
          i++;
          this.readyToAddStudent(stud, i);
        } else {
          this.courseService.addCourse(course).subscribe((resNewCourse: any) => {
            // spara en kopia av det id som kursen har fått av mongoose
            console.log('courses?? ' + resNewCourse);
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
    this.studentService.addStudent(stud).subscribe((resNewStudent: any) => {
      this.students.push(resNewStudent);
      console.log('add student?? ' + resNewStudent.name);
      // Lägg till roleId på i ny user
      if (this.regform.setRoleId(resNewStudent._id)) {
        this.regform.redirect();
      }

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
