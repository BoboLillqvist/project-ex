import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { StudentService } from '../../student.service';
import { isNumber } from 'util';
import { Person } from '../../models/person.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgForm } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrls: ['./create-student-profile.component.scss'],
  providers: [StudentService],
})
export class CreateStudentProfileComponent implements OnInit {

  @ViewChild(NgForm) studentForm: NgForm;

  selectedTag: string;
  tagList: string;
  noResult = false;

  availableTags: any[] = [
    'C++',
    'C#',
    'C',
    'PHP',
    'Python',
    'Java',
    'Javascript'
  ];

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
  skills: Array<string> = [];
  courseName: string;
  coursePoints: number;
  courses: Array<Course> = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.setUpYearList();
  }

  // skapa studenten utifrån formulär
  createStudent() {
    console.log('submitting');

    if (this.courses.length === 0) {
      // tror post routen ballar ur just nu om ingen kurs kommer med
      this.courses.push(new Course('Inga kurser tillagda', 0));
    }
    const student = new Student(this.fName, this.lName, this.education, this.examYear,
                                this.description, this.skills, this.courses, this.email, this.phoneNbr);
    this.addPerson(student);
  }

  // Startar kedjan med att lägga till en hel student.
  addPerson(stud: Student) {
    this.studentService.addPerson(stud.person).subscribe(resNewPerson => {
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

  //#region Tag functions

  tagAlreadyStored(tag: any): boolean {
    if (this.skills.includes(tag)) {
      return true;
    }
    return false;
  }

  removeEnteredTag(element: any): void {
    const tagToDelete = element.textContent;

    let index = 0;
    this.skills.forEach(enteredTag => {
        if (enteredTag === tagToDelete) {
          this.skills.splice(index, 1);
          this.restoreTag(enteredTag);
        }
      index++;
    });
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch, tagList: string, inputElement: any): void {
    this.selectedTag = event.value;
    this.tagList = tagList;

    this.storeTag();
    inputElement.value = null;
  }

  onEnter(event: any): void {
    if (!this.noResult) {
      return;
    }

    const inputElement = event.originalTarget;

    this.tagList = inputElement.id;
    this.selectedTag = inputElement.value;

    this.storeTag();
    inputElement.value = null;
  }

  storeTag(): void {
    if (this.tagAlreadyStored(this.selectedTag)) {
      console.log('Tag"' + this.selectedTag + '" already stored');
      return;
    }
      this.removeTagFromAvailable();

      this.skills.push(this.selectedTag);
  }

  removeTagFromAvailable() {
    for (let i = 0; i < this.availableTags.length; i++) {
      if (this.availableTags[i] === this.selectedTag) {
        this.availableTags.splice(i, 1);
        return;
      }
    }
    console.log('Could not find tag to remove');
  }

  removeStoredTag(tag: any): void {
    const index = this.availableTags.indexOf(tag);
    this.availableTags.splice(index, 1);
  }

  restoreTag(tag: any): void {
    this.availableTags.push(tag);
  }

  //#endregion

}
