import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  private _getUrl = '/api/students';


  constructor(private _http: Http) { }

  getStudents() {
    return this._http.get(this._getUrl).map((response: Response) => response.json());
  }

}
