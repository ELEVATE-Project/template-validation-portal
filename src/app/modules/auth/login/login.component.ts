import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  reactiveForm: any;
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
 

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
