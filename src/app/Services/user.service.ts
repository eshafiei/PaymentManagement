import { Configuration } from '../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private basePath: string;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private http: HttpClient, 
        private _configuration: Configuration, 
        private auth: AuthService, 
        private router: Router) {
        this.basePath = _configuration.ServerWithApiUrl;
    }

    register(userModel: User) {
        return this.http.post(this.basePath + 'user/register/', userModel);
    }

    login(username, password) {
        return this.auth.getAuthToken(username, password);
    }

    isAuthenticated() {
        let expires_in = localStorage.getItem('expires_in');
        let expiresAt = parseInt(expires_in) * 1000 + Date.now();

        if (Date.now() > expiresAt) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("current_user");
        }

        return Date.now() < expiresAt;
    }

    logout() {
        this.isUserLoggedIn.next(false);
        this.router.navigate(['login']);
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("current_user");
    }
}