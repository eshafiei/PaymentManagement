import { memberSepInfo } from '../../../../Models/memberSepInfo';
import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AccountAmount } from '../../../../Models/AccountAmount';

@Component({
  selector: 'accounttable',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})

export class AccountTableComponent implements OnInit {
  @Input() accountsInfo: Array<memberSepInfo>;
  
  selectedAccounts: Array<AccountAmount>;
  dataSource: AccountsDataSource;
  displayedColumns = ['select', 'MemberSep', 'Name', 'CurrentBalance', 'AmountDue'];
  selection = new SelectionModel<memberSepInfo>(true, []);
  allChecked: boolean;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.memberSepInfo.length;
    return numSelected === numRows;
  }

  ngOnInit() {
    this.selectedAccounts = new Array<AccountAmount>();

    this.accountsInfo.forEach(item => {
        item.name = item.firstName + " " + item.lastName;
    });

    this.dataSource = new AccountsDataSource(this.accountsInfo);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.memberSepInfo.forEach(row => {
        this.selection.select(row);
        row.Selected = true;
      }
      );

    this.selectedAccounts = new Array<AccountAmount>();

    if (this.isAllSelected()) {
      this.dataSource.memberSepInfo.forEach(row => {
        let account = new AccountAmount();
        account.MemberSep = row.memberSep;
        account.AmountDue = row.amountDue;
        this.selectedAccounts.push(account);
      });
    }

    this.setLocalStorage();
  }

  isSelected(row: memberSepInfo) {

    row.Selected = !row.Selected;
    if (row.Selected) {
      let account = new AccountAmount();
      account.MemberSep = row.memberSep;
      account.AmountDue = row.amountDue;
      if (this.selectedAccounts === undefined) {
        this.selectedAccounts = new Array<AccountAmount>();
        this.selectedAccounts.push(account);
      }
      else {
        this.selectedAccounts.push(account);
      }
    }
    else {
      if (this.selectedAccounts !== undefined) {
        let index = this.selectedAccounts.findIndex(x => x.MemberSep == row.memberSep);
        if (index > -1) {
          this.selectedAccounts.splice(index, 1);
        }
      }
    }

    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.removeItem("selectedAccounts");
    localStorage.setItem("selectedAccounts", JSON.stringify(this.selectedAccounts));
  }
}

export class AccountsDataSource implements DataSource<memberSepInfo> {

  constructor(public memberSepInfo: memberSepInfo[]) { 
    console.log('inside ctor', memberSepInfo);
  }

  

  private accountsSubject = new BehaviorSubject<memberSepInfo[]>(this.memberSepInfo);

  connect(): Observable<memberSepInfo[]> {
    return this.accountsSubject.asObservable();
  }

  disconnect(): void {
    this.accountsSubject.complete();
  }
}
