import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AccountService } from './../../../Services/account.service';
import { Account } from './../../../Models/Account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  data;
  noDataMessage;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.GetAll().subscribe((items: Account[]) => {
      this.data = items;
    }, (error) => {
      this.noDataMessage = "There is no account to display.";
    });
  }
}
