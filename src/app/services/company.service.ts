import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Company } from '../models/company.model';

@Injectable()
export class CompanyService {

  private _getUrl ="/api/companies";
  private _postUrl = "/api/company";
  private _putUrl = "/api/company/";
  private _deleteUrl = "/api/company/";

  public _id = '5ae2b45513ed9310c06691a9';

  constructor(private _http: HttpClient) { }

  getCompanies() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response);
  }

  getCompany(compId) {
    return this._http.get(this._getUrl + '/' + compId).map((res: Response) => res);
  }

  deleteCompany(company: Company) {
    return this._http.delete(this._deleteUrl + company._id)
      .map((response: Response) => response);
  }

  addCompany(company: Company) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl, JSON.stringify(company), {headers})
      .map((response: Response) => response);

  }

  updateCompany(company: Company) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this._putUrl + company._id, JSON.stringify(company), {headers})
      .map((response: Response) => response);
  }

  updateExamworkList(company: Company) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this._putUrl + 'examwork/' + company._id, JSON.stringify(company), {headers})
      .map((response: Response) => response);
  }


}
