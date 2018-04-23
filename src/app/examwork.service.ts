import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ExamWork } from './models/exam-work.model';

@Injectable()
export class ExamworkService {

  private _getUrl = "api/examworks";

  constructor(private _http: Http) { }

  getCompanies(){
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

}
