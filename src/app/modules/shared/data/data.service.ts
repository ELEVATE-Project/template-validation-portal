import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data).pipe(
      mergeMap((data: any) => {
        if (data?.status !== 200) {
          return observableThrowError(data?.error);
        }
        return observableOf(data);
      }));
  }

  get(requestParam: any): Observable<any> {
    return this.http.get(this.baseUrl + requestParam.url).pipe(
      mergeMap((data: any) => {
        if (data?.status !== 200) {
          return observableThrowError(data?.error);
        }
        return observableOf(data);
      }));
  }

}
