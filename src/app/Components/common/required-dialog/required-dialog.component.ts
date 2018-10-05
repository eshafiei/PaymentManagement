import { Component, OnInit, Inject } from '@angular/core';
import { PaymentWizardComponent } from '../../payment/payment-wizard/payment-wizard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'required-dialog',
  templateUrl: './required-dialog.component.html',
  styleUrls: ['./required-dialog.component.scss']
})
export class RequiredDialogComponent {

  constructor(public dialogRef: MatDialogRef<PaymentWizardComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    data = MAT_DIALOG_DATA;
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
