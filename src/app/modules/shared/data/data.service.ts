import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of as observableOf, throwError as observableThrowError, Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  post(requestParam: any): Observable<any> {
  
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data,{
      headers:requestParam?.headers
    }).pipe(
      mergeMap((data: any) => {
        if (data?.status !== 200) {
          return observableThrowError(data?.error);
        }
        return observableOf(data);
      }));
  }

  get(requestParam: any, params?:HttpParams): Observable<any> {
    
    return this.http.get(this.baseUrl + requestParam.url,{params:params,headers:requestParam.headers}).pipe(
      mergeMap((data: any) => {
        if (data?.status !== 200) {
          
          return observableThrowError(data?.error);
        }
        return observableOf(data);
      }));
  }

}
