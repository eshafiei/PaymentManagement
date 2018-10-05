import { Component} from '@angular/core';
import { SelectionModel, DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AccountAmount } from '../../../../Models/AccountAmount';

@Component({
  selector: 'paymenttable',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent {
  paymentAccountsInfo: Array<AccountAmount>;
  dataSource: AccountsDataSource;
  displayedColumns = ['MemberSep', 'PaymentAmount' ];
  selection = new SelectionModel<AccountAmount>(true, []);
  public static updateAccounts: Subject<boolean> = new Subject();

  constructor() {
    PaymentTableComponent.updateAccounts.subscribe(res => {
      this.paymentAccountsInfo = JSON.parse(localStorage.getItem("paymentAccounts"));
      this.dataSource = new AccountsDataSource(this.paymentAccountsInfo);
    })
  }
}

export class AccountsDataSource implements DataSource<AccountAmount> {

  constructor(public paymentAccounts: AccountAmount[]) { }

  private accountsSubject = new BehaviorSubject<AccountAmount[]>(this.paymentAccounts);

  connect(collectionViewer: CollectionViewer): Observable<AccountAmount[]> {
    return this.accountsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.accountsSubject.complete();
  }
}
