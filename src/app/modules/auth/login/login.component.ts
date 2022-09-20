import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,private router:Router) {}

  ngOnInit() {}
 

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.router.navigate(['/template/template-selection'])
    console.log(this.loginForm.value);
  }

  goToRegister(){
    this.router.navigate(['/auth/register'])
  }

}
