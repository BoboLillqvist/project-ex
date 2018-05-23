import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserAuthService {

  user: User;

  constructor(private http: Http, private router: Router) {
  }

  register(user: User) {
    const headers = new Headers( {'Content-Type': 'application/json'} );
    const options = new RequestOptions( {headers: headers } );
    return this.http.post('/api/register', user, options).map( (res: Response) => res.json());
  }

  login(user: User) {
    return this.http.post('/api/login', user).map( (res: Response) => res.json());
  setupSession(res) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.user.role);
    localStorage.setItem('expires', res.expiresIn);
    return res;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expires');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    const decodedToken = this.jwt.decodeToken(this.getToken());

    return decodedToken.role;
  }

  getRoleId() {
    const decodedToken = this.jwt.decodeToken(this.getToken());

    return decodedToken.roleId;
  }

  getExpiration() {
    const expireDate = this.jwt.getTokenExpirationDate(this.getToken());
    console.log('Decoded expiredate: ' + expireDate);
    return localStorage.getItem('expires');
  }

}
