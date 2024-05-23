import { User } from './../Models/user';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Login } from '../Models/login';
import { TokenModel } from '../Models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  private token: string;
  private tokenExpirationDate: Date;

  setTokenData(data: string, expiration: string) {
    this.token = data;
    this.tokenExpirationDate = new Date(expiration);
    localStorage.setItem('token', data);
    localStorage.setItem('tokenExpiration', expiration);
  }

  getTokenData() {
    return this.token;
  }

  constructor(private httpclient:HttpClient) { }
  login(loginModel:Login){
    return this.httpclient.post<TokenModel>
    (this.apiUrl+"api/auth/login",loginModel)
  }
  register(user:User){
    let newPath=this.apiUrl+"api/Auth/register";
    return this.httpclient.post(newPath,user)
   }
   isTokenExpired(): boolean {
    if (!this.tokenExpirationDate) {
      const expiration = localStorage.getItem('tokenExpiration');
      if (expiration) {
        this.tokenExpirationDate = new Date(expiration);
      } else {
        return true;
      }
    }
    return new Date() > this.tokenExpirationDate;
  }
  
  
  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }
  logout() {
    this.token = null;
    this.tokenExpirationDate = null;
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
}