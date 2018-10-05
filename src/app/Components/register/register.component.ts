import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
import { User } from '../../Models/User';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastr: ToastsManager, 
    private toastOpts: ToastOptions,
    private spinner: NgxSpinnerService, 
    private router: Router) {
    this.toastOpts.toastLife = 9000;
    this.toastOpts.showCloseButton = true;
    this.formBuilder = new FormBuilder();

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.spinner.show();
    const username = this.registerForm.get("email").value;
    const password = this.registerForm.get("password").value;
    let userModel = new User();
    userModel.username = username;
    userModel.password = password;
    userModel.confirmPassword = password;
    this.userService.register(userModel)
      .subscribe(s => {
        this.toastr.success('User registered Succcessfully', 'Registeration'),
        this.spinner.hide(),
        this.router.navigateByUrl('')
      }, (error) => {
         this.toastr.error(error.message, 'Registeration'),
         this.spinner.hide()
      });      
  }
}
