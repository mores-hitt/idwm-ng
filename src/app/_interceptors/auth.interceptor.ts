import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Intercepts HTTP requests and adds authorization headers.
 * If the request URL includes 'auth', the request is passed through without modification.
 * Otherwise, the request is cloned and the 'Authorization' header is added with the token from local storage.
 * @param req - The original HTTP request.
 * @param next - The next HTTP handler in the chain.
 * @returns An observable of the HTTP event stream.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.includes('auth')) {
      return next.handle(req);
    }
    const authToken = JSON.parse(localStorage.getItem('auth') || '{}').token;
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next.handle(cloneReq);
  }
}
