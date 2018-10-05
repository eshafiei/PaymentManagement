import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
import { UserService } from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    private toastOpts: ToastOptions,
    private spinner: NgxSpinnerService,
    private userService: UserService) {
    this.formBuilder = new FormBuilder();
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.toastOpts.toastLife = 9000;
    this.toastOpts.showCloseButton = true;
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.spinner.show();
    const emailAddress = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    let result = this.userService.login(emailAddress, password);

    if (result != undefined) {
      result.then((data) => {
        this.spinner.hide();
        this.toastr.success("User logged in successfully.", "Login");
        localStorage.setItem('access_token', data['access_token']);
        localStorage.setItem('expires_in', data['expires_in']);
        localStorage.setItem('current_user', emailAddress);
        this.userService.isUserLoggedIn.next(true);
        this.router.navigateByUrl(this.returnUrl);
      }).catch((error) => {
        this.spinner.hide();
        this.toastr.error(error, "Login");
      });
    }
    else {
      this.spinner.hide();
      this.toastr.error("Login failed. Please try again.", "Login");
    }
  }
}
