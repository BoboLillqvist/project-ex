import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

  public _id = '5aec68f586e32f2e804d4699';

  eduPrograms: string[] = [
    'Högskoleingenjör, datateknik',
  ];

  constructor(private _http: Http) { }

  getStudents() {
    return this._http.get(this._getStudents).map((res: Response) => res.json());
  }

  getStudent(studentId) {
    return this._http.get(this._getStudents + '/' + studentId).map((res: Response) => res.json());
  }

  addStudent(student: Student) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    return this._http.post(this._postStudent, JSON.stringify(student), options).map( (res: Response) => res.json() );
  }

  updateStudent(student: Student) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    return this._http.put(this._putStudent + student._id, JSON.stringify(student), options).map((res: Response) => res.json());
  }

  deleteStudent(student: Student) {
    return this._http.delete(this._putStudent + student._id).map((res: Response) => res.json());
  }

  getCourses() {
    return this._http.get(this._getCourses).map((res: Response) => res.json());
  }

  getCourse(courseName: string) {
    return this._http.get(this._getCourses + '/' + courseName).map((res: Response) => res.json());
  }

  addCourse(course: Course) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    console.log(JSON.stringify(course));
    return this._http.post(this._postCourse, JSON.stringify(course), options).map( (res: Response) => res.json() );
  }

  deleteCourse(course: Course) {
    return this._http.delete(this._putCourse + course._id).map((res: Response) => res.json());
  }

}
