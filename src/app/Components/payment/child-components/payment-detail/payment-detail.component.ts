import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit, OnChanges {

  @Input() paymentsAmount: number;

  paymentAmount: number;
  totalPaymentAmount: number;
  transactionFee: number;
  paymentAmountElements;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(change: SimpleChanges) {
    this.totalPaymentAmount = 0;
    this.transactionFee = 2;
    if (change['paymentsAmount']) {
      this.paymentAmount = change['paymentsAmount'].currentValue;
      this.totalPaymentAmount = +this.paymentAmount + this.transactionFee;
    }
  }
}
