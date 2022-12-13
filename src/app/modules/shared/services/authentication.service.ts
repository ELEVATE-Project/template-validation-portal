import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private dataService: DataService) { }

  login(body: any) {
    const reqParam = {
      url: 'authenticate',
      data: {
        request: {
          email: body.email,
          password: body.password
        }

      }
    }
    return this.dataService.post(reqParam);
  }

  signup(body: any) {
    const reqParam = {
      url: 'signup',
      headers:{
        "admin-token":"16c6a8b5cbad36c887e74eed42454241",
        "Content-Type":"application/json"
      },
      data: {
        request: {
          email: body.email,
          password: body.password
        }
      }
    }
    return this.dataService.post(reqParam);
  }
  isUserLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    }
    return false;
  }



}
