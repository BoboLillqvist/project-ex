import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ExamWork } from './models/exam-work.model';

@Injectable()
export class ExamworkService {

  private _getUrl = "/api/examwork";
  private _postUrl = "/api/examwork";

  constructor(private _http: Http) { }

  getCompanies(){
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addExamWork(examwork: ExamWork){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(examwork), options)
      .map((response: Response) => response.json());
  }

}
