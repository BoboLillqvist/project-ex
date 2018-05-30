import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { SimpleTagComponent } from '../../misc/simple-tag/simple-tag.component';
import { Router } from '@angular/router';
import { PersonService } from '../../../services/person.service';
import { ImageUploadComponent } from '../../file-upload/image-upload/image-upload.component';
import { UserAuthService } from '../../../services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.component.html',
  styleUrls: ['./edit-student-profile.component.scss'],
  providers: [StudentService, PersonService, ToastrService]
})
export class EditStudentProfileComponent implements OnInit {

  @ViewChild(SimpleTagComponent) studentSkillsComp;
  @ViewChild(ImageUploadComponent) imageUpload;

  eduPrograms: any;
  courseName: string;
  coursePoints: number;
  courses: Array<Course> = [];

  courseIndex: Array<Course> = [];

  student: Student;
  backupStudent: Student;

  constructor(
    private studService: StudentService,
    private persService: PersonService,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private auth: UserAuthService
  ) {
    this.eduPrograms = studService.eduPrograms;
   }

  ngOnInit() {

    this.courseService.getCourses().subscribe( (resCourses: any) => {
      this.courseIndex = resCourses;
    });

    this.student = new Student('', '', '', 0, '', [], [], '', '');
    
    const studId = this.auth.getRoleId();
    
    this.studService.getStudent(studId).subscribe((resStudentData: any) => {
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
    this.changePicture();
    this.student.name = this.student.person.firstName + ' ' + this.student.person.lastName;

    this.persService.updatePerson(this.student.person).subscribe((resData: any) => {
      this.student.person = resData;

      this.student.courseIds = [];
      let i = 0;
      this.student.courses.forEach(course => {
        // kolla om kurs finns i databas
        this.courseService.getCourse(course.name).subscribe((resCourse: any) => {
          if (resCourse != null) {
            this.student.courseIds.push(resCourse._id);
            i++;
            this.readyToAddStudent(this.student, i);
          } else {
            this.courseService.addCourse(course).subscribe((resNewCourse: any) => {
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
    this.studService.updateStudent(this.student).subscribe((resStudData: any) => {
      this.student = resStudData;
      let path = '/student/profile'

      this.toastr.success('Din profil är nu uppdaterad!');
      this.router.navigateByUrl(path);
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

    this.toastr.info('Inga förändringar har utförts');
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

  changePicture(){
    if(this.imageUpload.url != ''){
      this.student.pictureURL = this.imageUpload.url;
    }
  }
}
