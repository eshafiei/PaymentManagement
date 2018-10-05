import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Payment } from '../Models/Payment';

@Injectable()
export class PaymentService {

  paymentList: AngularFireList<any>;
  payment: Payment = new Payment();

  constructor(private firebase: AngularFireDatabase) {
    this.paymentList = this.firebase.list('payments');
  }

  insertPayment(payment: Payment) {
    this.paymentList.push({
      memberSep: payment.memberSep,
      confirmationCode: payment.confirmationCode,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      paymentType: payment.paymentType
    });
  }
}
