import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    startPaymentProcess(){
        this.router.navigate(['paymentinquiry']);
    }
}
