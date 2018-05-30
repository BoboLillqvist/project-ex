import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Tags } from '../models/tags.model';

@Injectable()
export class TagsService {
  private getUrl = 'api/tags';
  private putUrl = 'api/tags';

  constructor(private http: HttpClient) { }

  getAvailableTags() {
    return this.http.get(this.getUrl)
      .map((response: Response) => response);
  }

  updateAvailableTags(tags: Tags, storedTags: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Store new union set in tags value
    const addedValuesUnion = this.union(storedTags.essentials, storedTags.complimentary);
    const allTagsUnion = this.union(addedValuesUnion, tags.values);
    tags.values = allTagsUnion;

    return this.http.put(this.putUrl + tags._id, JSON.stringify(tags), {headers})
      .map((response: Response) => response);
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
