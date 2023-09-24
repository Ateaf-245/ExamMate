import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from  '.././helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { 
    
  }
  
  public getUser(username:any){
    return this.http.get(`${baseUrl}/user/${username}`)
  }

  // add user
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user)
  }

  // add user
  public updateUser(user:any){
    return this.http.put(`${baseUrl}/user/`,user)
  }

  //sent OTP
  public sendOTP(user:any){
    console.log(user)
    return this.http.post(`${baseUrl}/forgotPassword/sendOTP`,user);
  
  }

  public verifyOTP(user:any,otp:any){
    return this.http.post(`${baseUrl}/forgotPassword/verifyOTP/${otp}`, user);
  }

  public changePWD(user:any){
    console.log(user)
    return this.http.post(`${baseUrl}/forgotPassword/ChangePassword`,user);
  }
  
}
