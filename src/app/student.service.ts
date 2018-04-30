import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Student } from './models/student.model';
import { Course } from './models/course.model';
import { Person } from './models/person.model';

@Injectable()
export class StudentService {

  private _getUrl = '/api/students';
  private _getUrlCourse = '/api/courses/';
  private _postUrl = '/api/student';
  private _postUrlPerson = '/api/person';
  private _postUrlCourse = '/api/course';


  constructor(private _http: Http) { }

  getStudents() {
    return this._http.get(this._getUrl).map((response: Response) => response.json());
  }

  addStudent(student: Student) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    console.log(JSON.stringify(student));
    return this._http.post(this._postUrl, JSON.stringify(student), options).map( (res: Response) => res.json() );
  }

  addCourse(course: Course) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    console.log(JSON.stringify(course));
    return this._http.post(this._postUrlCourse, JSON.stringify(course), options).map( (res: Response) => res.json() );
  }

  getCourse(course: Course) {
    return this._http.get(this._getUrlCourse + course.name).map((response: Response) => response.json());
  }

  addPerson(person: Person) {
    console.log(person + ' from service');
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    console.log(JSON.stringify(person));
    return this._http.post(this._postUrlPerson, JSON.stringify(person), options).map( (res: Response) => res.json() );
  }

}
