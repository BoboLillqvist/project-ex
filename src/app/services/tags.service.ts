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
  // Source: https://stackoverflow.com/a/23080662
  union(a, b) {
    const unionArray = a.concat(b.filter(function(item) {
          return a.indexOf(item) < 0;
        })
    );

    return unionArray;
  }
}
