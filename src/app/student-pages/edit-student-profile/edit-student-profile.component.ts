import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { StudentService } from '../../student.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';
import { SimpleTagComponent } from '../../profiles/create-student-profile/simple-tag/simple-tag.component';
import { Router } from '@angular/router';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.component.html',
  styleUrls: ['./edit-student-profile.component.scss'],
  providers: [StudentService, PersonService]
})
export class EditStudentProfileComponent implements OnInit {

  @ViewChild(SimpleTagComponent) studentSkillsComp;

  eduPrograms: any;
  courseName: string;
  coursePoints: number;
  courses: Array<Course> = [];

  student: Student;
  backupStudent: Student;

  constructor(private studService: StudentService, private persService: PersonService,
              private cdr: ChangeDetectorRef, private router: Router) {
    this.eduPrograms = studService.eduPrograms;
   }

  ngOnInit() {
      // temp student för dev
      // const desc = 'I enjoy long walks on the beach and coding sessions that last deep into the night. I also enjoy baking bread.';
      // this.student = new Student('Andy', 'Milonakis', 'Högskoleingenjör, datateknik', 2019, desc, ['C#', 'Javascript'],
      //                             [new Course('Programmeringsmetodik', 7.5), new Course('Digitalteknik', 7.5)],
      //                             'jahn@test.se', '070555111');

      this.student = new Student('', '', '', 0, '', [], [], '', '');
      // TODO: hämta in student/student id från någonstans. Kanske kan hamna i någon Auth service vid login?
      const studId = this.studService._id;  // tar in hårdkodat id just nu
      this.studService.getStudent(studId).subscribe(resStudentData => {
        this.student = resStudentData;
        this.studentSkillsComp.skills = this.student.skills;
        // deep copy
        this.backupStudent = Object.assign({}, this.student);
        this.backupStudent.person = Object.assign({}, this.student.person);
      });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  updateStudent() {
    this.student.name = this.student.person.firstName + ' ' + this.student.person.lastName;

    this.persService.updatePerson(this.student.person).subscribe(resData => {
      this.student.person = resData;

      this.student.courseIds = [];
      let i = 0;
      this.student.courses.forEach(course => {
        // kolla om kurs finns i databas
        this.studService.getCourse(course.name).subscribe(resCourse => {
          if (resCourse != null) {
            this.student.courseIds.push(resCourse._id);
            i++;
            this.readyToAddStudent(this.student, i);
          } else {
            this.studService.addCourse(course).subscribe(resNewCourse => {
              // spara en kopia av det id som kursen har fått av mongoose
              this.student.courseIds.push(resNewCourse._id);
              i++;
              this.readyToAddStudent(this.student, i);
            });
          }
        });
      });
    });
  }

  finishUpdateAndGoBack() {
    this.student.skills = this.studentSkillsComp.skills;
    this.studService.updateStudent(this.student).subscribe(resStudData => {
      this.student = resStudData;
      this.router.navigate(['/student/profile']);
    });
  }

  readyToAddStudent(stud: Student, index) {
    if (index === stud.courses.length) {
      this.finishUpdateAndGoBack();
    }
  }

  cancelEdit() {
    this.student = Object.assign({}, this.backupStudent);
    this.student.person = Object.assign({}, this.backupStudent.person);
    this.router.navigate(['/student/profile']);
  }

  onPointsChange() {
    const point = this.coursePoints.toString().replace(',', '.');
  }

  addCourseToStudent() {
    this.student.courses.push(new Course(this.courseName, this.coursePoints));
    this.courseName = '';
    document.getElementById('courseInput').focus();
    this.coursePoints = undefined;
  }

  removeCourse(index) {
    this.student.courses.splice(index, 1);
  }
}
