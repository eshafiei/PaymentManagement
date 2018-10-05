import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // var x = this.accountService.getData();
    // x.snapshotChanges().subscribe(item => {
    //   this.accountList = [];
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["$key"] = element.key;
    //     this.accountList.push(y as AccountInfo);
    //   });
    // });
  }


  addAccount() {
    // let account = new AccountInfo();
    // account.memberNo = 101;
    // account.dateOfBirth = "11/14/1987";
    // account.status = true;
    // account.firstName = "Roxana";
    // account.lastName = "Attar";
    // account.memberSepInfo = [];
    // account.memberSepInfo.push(
    //   {
    //     Selected: false,
    //     memberSep: 101001,
    //     status: true,
    //     serviceAddress: "123 Main St, Marietta, GA, 30066",
    //     balance: 80,
    //     amountDue: 50,
    //     readDate: new Date("07/10/2018"),
    //     dueDate: new Date("07/31/2018")
    //   });
    // account.memberSepInfo.push(
    //   {
    //     Selected: false,
    //     memberSep: 101002,
    //     status: true,
    //     serviceAddress: "4567 Second St, Kennesaw, GA, 30144",
    //     balance: 99,
    //     amountDue: 67,
    //     readDate: new Date("07/05/2018"),
    //     dueDate: new Date("08/15/2018")
    //   });

    // this.accountService.insertAccount(account);
  }

  //removeAccount() {
  // this.accountService.deleteAccount("-LHyckfMp7JN28JMlR2J");
  //}

}
