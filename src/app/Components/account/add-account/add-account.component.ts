import { ValidateMemberNoNotTaken } from './../../../Validators/memberNo.validator';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../../Services/account.service';
import { CancelDialogComponent } from './../../common/cancel-dialog/cancel-dialog.component';


@Component({
  selector: 'add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private toastr: ToastsManager,
    private toastOpts: ToastOptions,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router) {
    this.toastOpts.toastLife = 9000;
    this.toastOpts.showCloseButton = true;
    
    this.accountForm = this.formBuilder.group({
      memberNo: ['', [Validators.required], ValidateMemberNoNotTaken.createValidator(this.accountService)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      serviceAddress: [null, Validators.required],
      phone: [null, Validators.required],
      cellphone: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  Cancel() {
    let config: MatDialogConfig = {
      disableClose: false,
      width: '350px',
      height: '180px',
      data: {
        value: "Are you sure you want to cancel?",
        route: "account"
      }
    };

    this.dialog.open(CancelDialogComponent, config);
  }

  CreateAccount() {
    if (this.accountForm.valid && this.accountForm != null) {
      this.spinner.show();
      this.accountService.AddMember(this.accountForm.value).subscribe(r => {
        if (r == true) {
          this.spinner.hide();
          this.toastr.success('Account created successfully.', 'Account');
          this.router.navigate(['account']);
        } else {
          this.spinner.hide();
          this.toastr.error('Account creation failed.', 'Account');
        }
      }, (error) => {
        this.spinner.hide();
        this.toastr.error(error, 'Account');
      })
    }
  }
}
