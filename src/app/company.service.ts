import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from './models/company';

@Injectable()
export class CompanyService {

  private _getUrl ="/api/companies";
  private _postUrl = "/api/company";
  private _putUrl = "/api/company/";
  private _deleteUrl = "/api/company/";

  constructor(private _http: Http) { }

  //TODO :: resten av CRUD operationerna
  //        service för studenter¨
  //        service för examensarbeten?
  getCompanies(){
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }




}
