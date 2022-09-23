import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,private dataService:DataService) { }

  login(body:any) {
    const reqParam = {
      url:'authenticate',
      data:{
        email:body.email,
        password:body.password
      }
    }
    return this.dataService.post(reqParam);
  }

  isUserLoggedIn(): boolean {
    if(localStorage.getItem('token')){
      return true
    }
    return false;
}

}
