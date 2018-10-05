import { AccountListComponent } from './Components/account/account-list/account-list.component';
import { AddAccountComponent } from './Components/account/add-account/add-account.component';
import { RegisterComponent } from './Components/register/register.component';
import { JwtHelper } from 'angular2-jwt';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
import { HomeComponent } from './Components/home/home.component';
import { PaymentWizardComponent } from './Components/payment/payment-wizard/payment-wizard.component';
import { PaymentInquiryComponent } from './Components/payment/payment-inquiry/payment-inquiry.component';
import { AccountDashboardComponent } from './Components/account/account-dashboard/account-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },

  // { path: 'conveniencefeecalc',
  //   component: ConveniencefeeComponent,
  //   canActivate: [AuthGuard]
  // },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'account',
    component: AccountDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accountlist',
    component: AccountListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addaccount',
    component: AddAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentWizardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'paymentinquiry',
    component: PaymentInquiryComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    JwtHelper
  ]
})

export class AppRoutingModule { }




