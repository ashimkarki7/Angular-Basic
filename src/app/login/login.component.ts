import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  submitted = false;
  returnUrl: string;
  errorMessage: string;
  isError: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute,
  private auth: AuthenticationService) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/profile';
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required, Validators.email],
      // If you want to add multiple validators to your form control, you’ll need to pass them inside an array as the second value to the form control’s value.
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const formValues = this.loginForm.value;
    // localStorage.setItem('user', JSON.stringify(formValues));
    this.auth.login(formValues.userName, formValues.password).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['../profile'], { relativeTo: this.route });
      // this.router.navigateByUrl(this.returnUrl).then(() => location.reload());
    }, (error: any) => {
      this.errorMessage = error.error.error_description || 'Server issue';
      this.isError = true;
    }
    );
  }



}
