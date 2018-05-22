import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TagsService {
  private getUrl = 'api/tags';

  constructor(private http: Http) { }

  getAvailableTags() {
    return this.http.get(this.getUrl)
      .map((response: Response) => response.json());
  }
}
