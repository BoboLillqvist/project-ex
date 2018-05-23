import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      // Lägg till egen header
      const tokenReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          Role: role
        }
      });

      // skicka vidare modifierat request objekt
      return next.handle(tokenReq);
    } else {
      console.log('token is null? ' + token);
      return next.handle(request);
    }
  }
}
