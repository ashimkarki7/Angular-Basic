import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean;
  submitted = false;
  returnUrl: string;
  errorMessage: string;
  isError: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute,
  private auth: AuthenticationService) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const formValues = this.registerForm.value;
    console.log('formVA', JSON.stringify(formValues));
    this.auth.register(formValues.email, formValues.password).subscribe((response: any) => {
      this.router.navigateByUrl(this.returnUrl).then(() => location.reload());
    }, (error: any) => {
      console.log('this.returnUrl', this.returnUrl);
      this.errorMessage = error.error.message || 'Server issue';
      this.isError = true;
    });
  }



}
