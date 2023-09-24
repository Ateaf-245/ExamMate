import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  

  constructor(private _http:HttpClient) { }

  public getDataByUser(username:any){
    return this._http.get(`${baseUrl}/results/${username}`);
  }

  public getDashboradDataByUser(username:any){
    return this._http.get(`${baseUrl}/results/dashboard/${username}`);
  }

  public getDashboradDataAdmin(){
    return this._http.get(`${baseUrl}/results/admin`);
  }
}
