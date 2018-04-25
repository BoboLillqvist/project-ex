import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Student } from './models/student.model';

@Injectable()
export class StudentService {

  private _getUrl = '/api/students';
  private _postUrl = '/api/student';


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

}
