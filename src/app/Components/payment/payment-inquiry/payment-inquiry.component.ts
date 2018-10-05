import { AccountService } from './../../../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'payment-inquiry',
  templateUrl: './payment-inquiry.component.html',
  styleUrls: ['./payment-inquiry.component.scss']
})
export class PaymentInquiryComponent implements OnInit {

  form: FormGroup;
  accountNbr: any;
  accountsInfo: any;
  public loading;
  isValid: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastsManager, private toastOpts: ToastOptions,
    private spinner: NgxSpinnerService) {
    this.toastOpts.toastLife = 9000;
    this.toastOpts.showCloseButton = true;
  }

  ngOnInit() {
    this.isValid = false;

    this.form = this.formBuilder.group({
      accountNbr: [null, Validators.required],
    });
  }

  // search() {
  //   this.slimLoadingBarService.start();

  //   this.accountService.getAccountsInfo(this.accountNbr, false)
  //     .subscribe(
  //       (data: any[]) => this.accountsInfo = data,
  //       error => {
  //         this.toastr.error(error, 'Error occurred', 'Something went wrong...');
  //         this.slimLoadingBarService.stop();
  //         this.slimLoadingBarService.complete();
  //       },
  //       () => {
  //         if (this.accountsInfo.length == 1 && this.accountsInfo[0] != null && this.accountsInfo[0].ErrorMessage == null) {
  //           this.isValid = true;
  //           this.toastr.success('Account information retrieved successfully.', 'Successful', 'Getting account information complete');
  //         } else
  //           if (this.accountsInfo.length == 1 && this.accountsInfo[0].ErrorMessage != null) {
  //             this.isValid = false;
  //             this.toastr.error(this.accountsInfo[0].ErrorMessage, 'Failed');
  //           } else {
  //             this.isValid = true;
  //             this.toastr.success('Account information retrieved successfully.', 'Successful', 'Getting account information complete');
  //           }

  //         this.slimLoadingBarService.complete();
  //       });
  // }

  searchAccounts() {
    this.spinner.show();

    this.accountService.GetAccountById(this.accountNbr)
      .subscribe(res => {
        this.accountsInfo = res;
        console.log(this.accountsInfo);
        if (this.accountsInfo.length > 0) {
          this.isValid = true;
          this.toastr.success('Account information retrieved successfully.', 'Successful', 'Getting account information complete');
          this.spinner.hide();
        }
        else {
          this.toastr.error('Account not found.', 'Error occurred');
          this.spinner.hide();
        }
      },
        (error) => {
          this.toastr.error(error, 'Error occurred', 'Something went wrong...');
          this.spinner.hide();
        });

    // accounts.subscribe(res => {
    //   this.accountsInfo = res.filter(x => x. == this.accountNbr);
    //   if(this.accountsInfo.length > 0){
    //     this.isValid = true;
    //     this.toastr.success('Account information retrieved successfully.', 'Successful', 'Getting account information complete');
    //     this.spinner.hide();
    //   }
    //   else{
    //     this.toastr.error('Account not found.', 'Error occurred');
    //     this.spinner.hide();
    //   }
    // },
    //   (error) => {
    //     this.toastr.error(error, 'Error occurred', 'Something went wrong...');
    //     this.spinner.hide();
    //   });


  }
}
