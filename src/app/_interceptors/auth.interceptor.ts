import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('req', req)
    if ( req.url.includes('auth') ) {
      return next.handle(req);
    }
    const authToken = (JSON.parse(localStorage.getItem('auth') || '{}')).token;
    console.log('authToken', authToken)
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('cloneReq', cloneReq)
    return next.handle(cloneReq);
  }
}
