import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ExamWork } from '../models/exam-work.model';

@Injectable()
export class ExamworkService {

  private _getUrl = '/api/examworks';
  private _postUrl = '/api/examwork';

  constructor(private _http: HttpClient) { }

  getExamWorks() {
    return this._http.get(this._getUrl).map((res: Response) => res);
  }

  getExamWork(examId) {
    return this._http.get(this._getUrl + '/' + examId).map((res: Response) => res);
  }

  addExamWork(examwork: ExamWork) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this._postUrl, JSON.stringify(examwork), {headers}).map((response: Response) => response.json());
  }

}
