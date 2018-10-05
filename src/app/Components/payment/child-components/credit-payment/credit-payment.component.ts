import { Payment } from '../../../../Models/Payment';
import { PaymentService } from '../../../../Services/payment.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CreditCardValidator } from 'ngx-credit-cards';

@Component({
  selector: 'credit-payment',
  templateUrl: './credit-payment.component.html',
  styleUrls: ['./credit-payment.component.scss']
})
export class CreditPaymentComponent implements OnInit {

  @Output() paymentProcessedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  payment: Payment;
  ccPaymentForm: FormGroup;
  ccPayment_validation_messages = {
    'cardNumber': [
      { type: 'required', message: 'Card number is required.' },
      { type: 'error', message: 'Card number is invalid.' }
    ],
    'cardExpDate': [
      { type: 'required', message: 'Expiry date is required.' },
      { type: 'error', message: 'Expiry date is invalid.' }
    ],
    'cardCvc': [
      { type: 'required', message: 'Cvc is required.' },
      { type: 'error', message: 'Cvc is invalid.' }
    ],
    'zip': [
      { type: 'required', message: 'Zip code is required.' },
      { type: 'minlength', message: 'Zip code must be 5 digits long.' },
      { type: 'maxlength', message: 'Zip code must be 5 digits long.' }
    ]
  }

  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService) {
    this.payment = new Payment();
    this.formBuilder = new FormBuilder();

    this.ccPaymentForm = this.formBuilder.group({
      cardNumber: new FormControl('', Validators.compose([CreditCardValidator.validateCardNumber, Validators.required])),
      cardExpDate: new FormControl('', Validators.compose([CreditCardValidator.validateCardExpiry, Validators.required])),
      cardCvc: new FormControl('', Validators.compose([CreditCardValidator.validateCardCvc, Validators.required])),
      zip: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  ngOnInit() {
  }

  CardTypeCheck(ccNumber) {
    let insertedCardType = null;
    let assetsPath = "../../../../assets/";
    let ccTypeElement = document.querySelector("#ccType");
    let ccTypeSpanElement = document.querySelector("#ccTypeSpan");
    ccTypeSpanElement['style'] = "display:none;";

    let cardsTypes = [
      { type: 'visa', regex: /^4/ },
      { type: 'mastercard', regex: /^5[1-5]/ },
      { type: 'amex', regex: /^3[47]/ },
      { type: 'diners', regex: /^30[0-5]/ },
      { type: 'jcb', regex: /^35(2[89]|[3-8][0-9])/ },
      { type: 'visa-electron', regex: /^(4026|417500|4508|4844|491(3|7))/ },
      { type: 'maestro', regex: /^(5000|5018|5020|5038|6304|6759|676[1-3])/ },
      { type: 'discover', regex: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/ }
    ];

    if (ccNumber.value) {
      cardsTypes.forEach(element => {
        if (element.regex.test(ccNumber.value.substring(0, 6))) {
          insertedCardType = element.type;
          this.payment.paymentType = element.type;
        }
      });
    }

    switch (insertedCardType) {
      case 'visa':
        ccTypeElement['src'] = assetsPath + "visa.ico";
        ccTypeSpanElement['style'] = "display:inline;";
        break;
      case 'mastercard':
        ccTypeElement['src'] = assetsPath + "mastercard.png";
        ccTypeSpanElement['style'] = "display:inline;";
        break;
      case 'amex':
        ccTypeElement['src'] = assetsPath + "amex.ico";
        ccTypeSpanElement['style'] = "display:inline;";
      case 'discover':
        ccTypeElement['src'] = assetsPath + "discover.png";
        ccTypeSpanElement['style'] = "display:inline;";
        break;
      case 'jcb':
        ccTypeElement['src'] = assetsPath + "jcb.ico";
        ccTypeSpanElement['style'] = "display:inline;";
        break;
      default:
        break;
    }
  }

  processPayment() {
    let paymentAccounts = JSON.parse(localStorage.getItem("paymentAccounts"));

    if (this.ccPaymentForm.valid && paymentAccounts != null) {
      paymentAccounts.forEach(element => {
        this.payment.confirmationCode = "actzkx";
        this.payment.paymentDate = new Date().toDateString();
        this.payment.paymentAmount = element.AmountDue;
        this.payment.memberSep = element.MemberSep;
        this.paymentService.insertPayment(this.payment);
      });

      localStorage.removeItem("paymentAccounts");
    }

    this.paymentProcessedEvent.emit(true);
  }
}
