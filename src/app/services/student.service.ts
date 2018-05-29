import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Student } from '../models/student.model';
import { Person } from '../models/person.model';

@Injectable()
export class StudentService {

  private _getStudents = '/api/students';
  private _postStudent = '/api/student';
  private _putStudent = '/api/student/';

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

}
