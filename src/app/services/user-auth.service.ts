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
      console.log('from auth?? ' + res.user.role);
      return this.setupSession(res);
    });
  }

  login(user: User) {
    return this.http.post('/api/login', user).map( res => {
      this.setupSession(res);
      return res;
    });
  }

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

  updateRoleId(user: User) {
    return this.http.put('/api/user/' + user._id, user).map( (res: any) => res);
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

  getToken() {
    let token = localStorage.getItem('token');

    if (token === null) {
      token = '';
    }

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

  getExpiration() {
    const expireDate = this.jwt.getTokenExpirationDate(this.getToken());
    console.log('Decoded expiredate: ' + expireDate);
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

    if (token !== '') {
      const decoded = this.jwt.decodeToken(token);

      decodedToken.name = decoded.name;
      decodedToken.username = decoded.username;
      decodedToken.role = decoded.role;
      decodedToken.roleId = decoded.roleId;

      console.log('Decoded name? ' + decodedToken.name);
    }

    return decodedToken;
  }
}
