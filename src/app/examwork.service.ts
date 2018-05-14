import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ExamWork } from './models/exam-work.model';

@Injectable()
export class ExamworkService {

  private _getUrl = '/api/examworks';
  private _postUrl = '/api/examwork';

  constructor(private _http: Http) { }

  getExamWorks() {
    return this._http.get(this._getUrl).map((res: Response) => res.json());
  }

  getExamWork(examId) {
    return this._http.get(this._getUrl + '/' + examId).map((res: Response) => res.json());
  }
  
  addExamWork(examwork: ExamWork) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(examwork), options)
      .map((response: Response) => response.json());
  }

}
