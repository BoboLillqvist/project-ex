import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Person } from '../models/person.model';

@Injectable()
export class PersonService {
  private _getPersons = '/api/persons';
  private _postPerson = '/api/person';
  private _putPerson = '/api/person/';
  private _deletePerson = '/api/person/';

  public _id = '5af959580b35eb2d20611448';

  constructor(private _http: Http) { }

  getPersons() {
    return this._http.get(this._getPersons).map((res: Response) => res.json());
  }

  getPerson(personId) {
    return this._http.get(this._getPersons + '/' + personId).map( (res: Response) => res.json());
  }

  addPerson(person: Person) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    console.log(JSON.stringify(person));
    return this._http.post(this._postPerson, JSON.stringify(person), options).map( (res: Response) => res.json() );
  }

  updatePerson(person: Person) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    return this._http.put(this._putPerson + person._id, JSON.stringify(person), options).map((res: Response) => res.json());
  }

  deletePerson(person: Person) {
    return this._http.delete(this._deletePerson + person._id).map((res: Response) => res.json());
  }
}
