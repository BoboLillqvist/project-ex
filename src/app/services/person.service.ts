import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Person } from '../models/person.model';

@Injectable()
export class PersonService {
  private _getPersons = '/api/persons';
  private _postPerson = '/api/person';
  private _putPerson = '/api/person/';
  private _deletePerson = '/api/person/';

  constructor(private _http: HttpClient) { }

  getPersons() {
    return this._http.get(this._getPersons).map((res: Response) => res );
  }

  getPerson(personId) {
    return this._http.get(this._getPersons + '/' + personId).map( (res: Response) => res );
  }

  addPerson(person: Person) {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'} );
    return this._http.post(this._postPerson, JSON.stringify(person), {headers}).map( (res: Response) => res );
  }

  updatePerson(person: Person) {
    const headers = new HttpHeaders( {'Content-Type': 'application/json'} );
    return this._http.put(this._putPerson + person._id, JSON.stringify(person), {headers}).map((res: Response) => res);
  }

  deletePerson(person: Person) {
    return this._http.delete(this._deletePerson + person._id).map((res: Response) => res);
  }
}
