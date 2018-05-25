import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class UserAuthService {

  user: User;

  constructor(private http: HttpClient, private router: Router, private jwt: JwtHelper) {
    this.user = new User('', '', '', '' , '');
  }

  register(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('/api/register', user, { headers } ).map( (res: any) => {
      console.log('from auth?? ' + res);
      this.setupSession(res);
      return res;
    });
  }

  login(user: User) {
    return this.http.post('/api/login', user).map( res => {
      this.setupSession(res);
      return res;
    });
  }

  // store the token(s) for the session. (valid for 2 hours)
  setupSession(res) {
    localStorage.setItem('token', res.token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  updateRoleId(user: User) {
    return this.http.put('/api/user/' + user._id, user).map( (res: any) => {
      localStorage.setItem('token', res.token);
      return res;
    });
  }

   // returns true or false depending on if token is expired
  loggedIn() {
    const now = new Date().getTime() / 1000;
    const expire = this.getExpiration().getTime() / 1000;

    if (now > expire) {
      return false;
    }

    return true;
  }

  // returns token from localstorage
  getToken() {
    const token = localStorage.getItem('token');

    return token;
  }

  getRole() {
    const decodedToken = this.getDecodedToken();

    return decodedToken.role;
  }

  getRoleId() {
    const decodedToken = this.getDecodedToken();

    return decodedToken.roleId;
  }

  getUserName() {
    const decodedToken = this.getDecodedToken();

    return decodedToken.name;
  }

  // returns expiration date of the token.
  getExpiration() {

    let expireDate = new Date();
    expireDate.setFullYear(1970);

    const token = this.getToken();

    if (token !== null) {
      expireDate = this.jwt.getTokenExpirationDate(token);
    }

    return expireDate;
  }

  private getDecodedToken() {

    const decodedToken = {
      name: '',
      username: '',
      role: '',
      roleId: '',
    };

    const token = this.getToken();

    if (token !== null) {

      const decoded = this.jwt.decodeToken(token);

      decodedToken.name = decoded.name;
      decodedToken.username = decoded.username;
      decodedToken.role = decoded.role;
      decodedToken.roleId = decoded.roleId;

    }

    return decodedToken;
  }
}
