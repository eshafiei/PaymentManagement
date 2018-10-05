import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean;
  authenticatedUser;

  constructor(private userService: UserService) {
    this.userService.isUserLoggedIn.subscribe(value => {
      this.authStatus(value);
    });
  }

  ngOnInit(){
    let currentUser = localStorage.getItem("current_user");

    if(currentUser != null){
      this.authStatus(true);
    }else{
      this.authStatus(false);
    }
  }

  logout() {
    this.userService.logout();
  }

  authStatus(isAuthenticated) {
    this.isLoggedIn = isAuthenticated;

    if (isAuthenticated) {
      this.authenticatedUser = localStorage.getItem("current_user");
    }
    else {
      this.authenticatedUser = null;
    }
  }
}
