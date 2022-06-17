import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  /* Register And Login */
  registerUser(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Customers', obj);
  }
  authLoginUsingEmail(obj:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'authLogin/emailId', obj);
  }
  authLoginUsingMobile(obj:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'authLogin/mobileNumber', obj);
  }
  generateOTP(obj:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'SendEmail', obj);
  }
  verifyOTP(obj:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'verifyOtp', obj);
  }
  resetPassword(obj:any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'resetPassword', obj);
  }
  updateProfile(obj:any): Observable<any>{
    return this.http.put<any>(this.baseUrl + 'Customers',obj)
  }

 
}
