import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../shared/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  reactiveForm: any;
  loader:any = false;
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

  constructor(private fb: FormBuilder, private router: Router, 
    private authService: AuthenticationService, private toastr: ToastrService, private dataService:DataService) { }
  
  ngOnInit() {
    
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['/template/template-selection'])
    }

   }


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loader = true;
    this.authService.login(this.loginForm.value)
   
      .subscribe((resp: any) => {
        this.loader = false;
        if (resp?.response?.accessToken) {
          this.toastr.success('Login Successful','Success')
          localStorage.setItem('token',resp?.response?.accessToken);
          this.router.navigate(['/template/template-selection'])
        }
      }, (error: any) => {
        this.loader = false;
        this.toastr.error(error,'Error')
      })

  
  }

  goToRegister() {
    this.router.navigate(['/auth/register'])
    

  }

}
