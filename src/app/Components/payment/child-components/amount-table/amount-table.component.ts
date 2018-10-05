import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AccountAmount } from '../../../../Models/AccountAmount';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'amounttable',
  templateUrl: './amount-table.component.html',
  styleUrls: ['./amount-table.component.scss']
})
export class AmountTableComponent implements OnInit {

  @Output() numberOfPaymentsEvent: EventEmitter<number> = new EventEmitter<number>();

  ccAmountForm: FormGroup;
  selectedAccountsInfo: Array<AccountAmount>;
  dataSource: AccountsDataSource;
  displayedColumns = ['MemberSep', 'PaymentAmount'];
  selection = new SelectionModel<AccountAmount>(true, []);
  public static updateAccounts: Subject<boolean> = new Subject();
  paymentsAmount: number;

  constructor(private formBuilder: FormBuilder) {
    this.formBuilder = new FormBuilder();

    this.ccAmountForm = this.formBuilder.group({
      paymentAmount: new FormControl(),
    });
  }

  ngOnInit() {
    AmountTableComponent.updateAccounts.subscribe(res => {
      this.selectedAccountsInfo = JSON.parse(localStorage.getItem("selectedAccounts"));
      this.dataSource = new AccountsDataSource(this.selectedAccountsInfo);
      this.UpdatePayments();
    })
  }

  UpdatePayments() {
    this.paymentsAmount = 0;

    if (this.selectedAccountsInfo !== undefined && this.selectedAccountsInfo !== null) {
      localStorage.setItem("paymentAccounts", JSON.stringify(this.selectedAccountsInfo.map(val => <AccountAmount>{
        MemberSep: val.MemberSep,
        AmountDue: val.AmountDue
      })));

      for (let i = 0; i < this.selectedAccountsInfo.length; i++) {
        this.paymentsAmount += this.selectedAccountsInfo[i].AmountDue;
      }

      this.numberOfPaymentsEvent.emit(this.paymentsAmount);
    }
  }
}

export class AccountsDataSource implements DataSource<AccountAmount> {

  constructor(public selectedAccountsInf: AccountAmount[]) { }

  private accountsSubject = new BehaviorSubject<AccountAmount[]>(this.selectedAccountsInf);

  connect(): Observable<AccountAmount[]> {
    return this.accountsSubject.asObservable();
  }

  disconnect(): void {
    this.accountsSubject.complete();
  }
}
