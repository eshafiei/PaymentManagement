import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountInformation } from '../../../Models/AccountInformation';
import { AmountTableComponent } from '../child-components/amount-table/amount-table.component';
import { PaymentTableComponent } from '../child-components/payment-table/payment-table.component';
import { CancelDialogComponent } from '../../common/cancel-dialog/cancel-dialog.component';
import { MatDialog, MatStepper, MatDialogConfig } from '@angular/material';
import { PaymentTypes } from '../../../Models/PaymentTypes';
import { RequiredDialogComponent } from '../../common/required-dialog/required-dialog.component';

@Component({
  selector: 'paymentwizard',
  templateUrl: './payment-wizard.component.html',
  styleUrls: ['./payment-wizard.component.scss']
})
export class PaymentWizardComponent implements OnInit {
  @Input() accountsInfo: Array<AccountInformation>;
  selectedAccounts: Array<number>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  inactiveAccounts: any;
  selectedPaymemtType: string;
  paymentTypes: PaymentTypes[] = [
    { value: 'cc', viewValue: 'Credit card' },
    { value: 'ec', viewValue: 'E-Check' },
    { value: 'ca', viewValue: 'Cash' },
    { value: 'ce', viewValue: 'Check' }
  ];
  creditCardPayment: boolean;
  eCheckPayment: boolean;
  cashPayment: boolean;
  checkPayment: boolean;
  amountOfPayments;
  cancelButtonElement;
  isprocessed;

  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {

    localStorage.removeItem("selectedAccounts");
    localStorage.removeItem("paymentAccounts");

    this.creditCardPayment = false;
    this.eCheckPayment = false;
    this.cashPayment = false;
    this.checkPayment = false;

    this.inactiveAccounts = { AccountStatus: 'I' };

    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    this.secondFormGroup = this._formBuilder.group({
      paymentAmount: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      cardNumber: ['', Validators.required],
      cardExpDate: ['', Validators.required],
      cardCvc: ['', Validators.required],
      zip: ['', Validators.required]
    });

    this.cancelButtonElement = document.querySelector("#cancelPayment");
  }

  first(stepper: MatStepper) {
    let paymentAccountsCheckElement = document.querySelector("mat-checkbox.mat-checkbox-checked");
    if (paymentAccountsCheckElement != null) {
      AmountTableComponent.updateAccounts.next(true);
      stepper.next();
    }
    else {
      this.showRequiredDialog("Please select payment account/s to continue.");
    }
  }

  second(stepper: MatStepper) {
    let paymentAmountElements = document.querySelectorAll("#paymentAmount");
    let isValid = true;

    for (let i = 0; i < paymentAmountElements.length; i++) {
      if (paymentAmountElements[i].getAttribute("ng-reflect-value") == null ||
        paymentAmountElements[i].getAttribute("ng-reflect-value") == "" ||
        paymentAmountElements[i].getAttribute("ng-reflect-value") == "0") {
        isValid = false;
        break;
      }
      else {
        continue;
      }
    }

    if (!isValid) {
      this.showRequiredDialog("Payment amount is required.");
    }
    else {
      PaymentTableComponent.updateAccounts.next(true);
      stepper.next();
    }
  }

  MakeCreditPayment() {
    this.cancelButtonElement.setAttribute('style', 'display:none;');
    //stepper.next();
  }

  reset() {
    this.cancelButtonElement.setAttribute('style', 'display:inline;');
    this.router.navigate(['']);
  }

  cancelPayment(): void {
    let config: MatDialogConfig = {
      disableClose: false,
      width: '350px',
      height: '180px',
      data: {
        value: "Are you sure you want to cancel this payment?"
      }
    };

    this.dialog.open(CancelDialogComponent, config);
  }

  showRequiredDialog(message): void {
    let config: MatDialogConfig = {
      disableClose: false,
      width: '350px',
      height: '180px',
      data: {
        value: message
      }
    };

    this.dialog.open(RequiredDialogComponent, config);
  }

  PopulatePayment(_paymentType) {
    switch (_paymentType) {
      case 'cc':
        this.creditCardPayment = true;
        break;

      default:
        break;
    }
  }

  getPayments(evt) {
    this.amountOfPayments = evt;
  }

  paymentProcessed(evt, stepper: MatStepper) {
    this.isprocessed = evt;

    if (this.isprocessed) {
      stepper.next();
    }
  }
}
