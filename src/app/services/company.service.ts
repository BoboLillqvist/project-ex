import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from '../models/company.model';

@Injectable()
export class CompanyService {

  private _getUrl ="/api/companies";
  private _postUrl = "/api/company";
  private _putUrl = "/api/company/";
  private _deleteUrl = "/api/company/";

  public _id = '5ae2b45513ed9310c06691a9';

  constructor(private _http: Http) { }

  //TODO :: resten av CRUD operationerna
  //        service för studenter¨
  //        service för examensarbeten?
  getCompanies(){
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  getCompany(compId) {
    return this._http.get(this._getUrl + '/' + compId).map((res: Response) => res.json());
  }

  deleteCompany(company: Company){
    return this._http.delete(this._deleteUrl + company._id)
      .map((response: Response) => response.json());
  }

  addCompany(company: Company){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(company), options)
      .map((response: Response) => response.json());

  }

  updateCompany(company: Company){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this._http.put(this._putUrl + company._id, JSON.stringify(company), options)
      .map((response: Response) => response.json());
  }


}
