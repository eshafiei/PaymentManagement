import { AddAccountComponent } from './Components/account/add-account/add-account.component';
import { AccountDashboardComponent } from './Components/account/account-dashboard/account-dashboard.component';
import { RequiredDialogComponent } from './Components/common/required-dialog/required-dialog.component';
import { PaymentDetailComponent } from './Components/payment/child-components/payment-detail/payment-detail.component';
import { CreditPaymentComponent } from './Components/payment/child-components/credit-payment/credit-payment.component';
import { Configuration } from './app.constants';
import { HomeComponent } from './Components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Services/token.interceptor';
import { ToastModule } from 'ng2-toastr';
import { NgGridModule } from 'angular4-grid';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import { ActiveAccountsFilterPipe } from './Pipes/active-accounts-filter.pipe';
import { AccountTableComponent } from './Components/payment/child-components/account-table/account-table.component';
import { AmountTableComponent } from './Components/payment/child-components/amount-table/amount-table.component';
import { PaymentTableComponent } from './Components/payment/child-components/payment-table/payment-table.component';
import { DataCollectionComponent } from './Components/data-table/data-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { PaymentInquiryComponent } from './Components/payment/payment-inquiry/payment-inquiry.component';
import { PaymentWizardComponent } from './Components/payment/payment-wizard/payment-wizard.component';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatMenuModule,
  MatCardModule, MatGridListModule, MatDividerModule, MatListModule, MatRadioModule, MatStepperModule,
  MatTableModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { CancelDialogComponent } from './Components/common/cancel-dialog/cancel-dialog.component';
import { NgXCreditCardsModule } from 'ngx-credit-cards';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RegisterComponent } from './Components/register/register.component';
import { AccountService } from './Services/account.service';
import { AuthService } from './Services/auth.service';
import { PaymentService } from './Services/payment.service';
import { UserService } from './Services/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountListComponent } from './Components/account/account-list/account-list.component';
import { DataTableModule } from "angular-6-datatable";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent,
    PaymentInquiryComponent,
    AccountTableComponent,
    AmountTableComponent,
    PaymentTableComponent,
    PaymentWizardComponent,
    ActiveAccountsFilterPipe,
    DataCollectionComponent,
    CancelDialogComponent,
    CreditPaymentComponent,
    PaymentDetailComponent,
    RequiredDialogComponent,
    RegisterComponent,
    AccountDashboardComponent,
    AddAccountComponent,
    AccountListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatKeyboardModule,
    MatSelectModule,
    CdkTableModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgGridModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    NgXCreditCardsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    DataTableModule
  ],
  entryComponents: [
    CancelDialogComponent,
    RequiredDialogComponent
  ],
  exports: [BrowserModule, ReactiveFormsModule, CdkTableModule, CancelDialogComponent, RequiredDialogComponent],
  bootstrap: [AppComponent],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
      Configuration,
      UserService,
      AccountService,
      AuthService,
      PaymentService
    ]
})

export class AppModule {

}
