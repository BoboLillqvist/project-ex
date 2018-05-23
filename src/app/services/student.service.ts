import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';
import { Person } from '../models/person.model';

@Injectable()
export class StudentService {

  private _getStudents = '/api/students';
  private _postStudent = '/api/student';
  private _putStudent = '/api/student/';
  private _getCourses = '/api/courses';
  private _postCourse = '/api/course';
  private _putCourse = '/api/course/';


  eduPrograms: string[] = [
    'Högskoleingenjör, datateknik',
  ];

  constructor(private _http: HttpClient) { }

  getStudents() {
    return this._http.get(this._getStudents).map((res: Response) => res);
  }

  getStudent(studentId) {
    return this._http.get(this._getStudents + '/' + studentId).map( (res: Response) => res);
  }

  addStudent(student: Student) {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'} );
    return this._http.post(this._postStudent, JSON.stringify(student), {headers}).map( (res: any) => res );
  }

  updateStudent(student: Student) {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'} );
    return this._http.put(this._putStudent + student._id, JSON.stringify(student), {headers}).map( res => res);
  }

  deleteStudent(student: Student) {
    return this._http.delete(this._putStudent + student._id).map((res: Response) => res);
  }

  getCourses() {
    return this._http.get(this._getCourses).map((res: Response) => res);
  }

  getCourse(courseName: string) {
    return this._http.get(this._getCourses + '/' + courseName).map((res: Response) => res);
  }

  addCourse(course: Course) {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'} );
    return this._http.post(this._postCourse, JSON.stringify(course), {headers}).map( (res: Response) => res );
  }

  deleteCourse(course: Course) {
    return this._http.delete(this._putCourse + course._id).map((res: Response) => res);
  }

}
