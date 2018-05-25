import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }


  // Denna metod kallas så fort en HttpRequest görs
  // Den fångar alltså upp request calls, och lägger till en ny header med lagrad token (om den finns).
  // Detta gör så att servern kan verifiera att requesten kommer från en inloggad användare
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      // Lägg till egen header
      const tokenReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      // skicka vidare modifierat request objekt
      return next.handle(tokenReq);
    } else {

      return next.handle(request);
    }
  }
}
