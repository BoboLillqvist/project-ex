import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Tags } from '../models/tags.model';

@Injectable()
export class TagsService {
  private getUrl = 'api/tags';
  private putUrl = 'api/tags';

  constructor(private http: Http) { }

  getAvailableTags() {
    return this.http.get(this.getUrl)
      .map((response: Response) => response.json());
  }

  updateAvailableTags(tags: Tags, storedTags: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});

    // Store new union set in tags value
    const addedValuesUnion = this.union(storedTags.essentials, storedTags.complimentary);
    const allTagsUnion = this.union(addedValuesUnion, tags.values);
    tags.values = allTagsUnion;

    return this.http.put(this.putUrl + tags._id, JSON.stringify(tags), options)
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
