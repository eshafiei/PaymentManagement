import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'account',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss']
})
export class AccountDashboardComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {

  }

  AddAccount() {
    this.router.navigate(['addaccount']);
  }

  
}
