import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course.model';

@Injectable()
export class CourseService {

  private _getCourses = '/api/courses';
  private _postCourse = '/api/course';
  private _putCourse = '/api/course/';

  constructor(private _http: HttpClient) { }

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
