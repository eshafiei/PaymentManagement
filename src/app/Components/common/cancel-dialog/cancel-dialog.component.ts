import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentWizardComponent } from '../../payment/payment-wizard/payment-wizard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent {

  constructor(public dialogRef: MatDialogRef<PaymentWizardComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { 
    data = MAT_DIALOG_DATA;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(){
    let route = this.data.route;
    if(!route){
      route = '';
    }
    this.dialogRef.close();
    this.router.navigate([route]);
  }
}
