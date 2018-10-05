import { Account } from './../Models/Account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';

@Injectable()
export class AccountService {

  private basePath: string;

  constructor(private http: HttpClient,
    private _configuration: Configuration, ) { 
    this.basePath = _configuration.ServerWithApiUrl;
  }

  GetAll() {
    return this.http.get(this.basePath + 'account/getallaccounts');
  }

  GetAccountById(accountId: number) {
    return this.http.get(this.basePath + 'account/GetAccounts?accountId=' + accountId);
  }

  AddMember(account: Account){
    return this.http.post(this.basePath + 'account/addAccount/', account);
  }

  VerifyMemberNo(memberNo){
    return this.http.get(this.basePath + 'account/verifymemberno?memberNo=' + memberNo);
  }
}
