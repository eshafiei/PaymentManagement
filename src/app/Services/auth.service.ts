import { Configuration } from '../app.constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthService {

  constructor(private http: Http,
    private _configuration: Configuration) {
  }

  public getToken(username: string, password: string): Observable<{}> {
    return Observable.fromPromise(this.getAuthToken(username, password));
  }

  public getAuthToken(username: string, password: string): Promise<{}> {
    let body = "username=" + username + "&password=" + password + "&grant_type=password";
    let options = {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let promise = new Promise((resolve, reject) => {
      this.http.post(this._configuration.Server + 'token', body, options)
        .toPromise()
        .then(
          result => { // Success
            resolve(result.json());
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}

