import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hidepassword: boolean = false;
  hideconformpassword: boolean = false;
  form: FormGroup = new FormGroup({});
  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
      ],
    ],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() { }

  onRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    this.authService.signup(this.registerForm.value)
      .subscribe((resp: any) => {
        if (resp?.status === 200) {
          this.toastr.success(resp?.response, 'Success')
          this.router.navigate(['/auth/login'])
        }
      }, (error: any) => {
        this.toastr.error(error, 'Error')
      })


  }
}

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
