import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getToken('ehsan', '123456')
        .mergeMap((result: any) => {
            if (result.access_token) {
                // clone and modify the request
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${result.access_token}`
                    }
                });
            }

            return next.handle(request);
        });
    }
}
