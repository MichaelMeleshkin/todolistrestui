import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SignInData } from './interfaces/sign-in.interface';
import { SignUpData } from './interfaces/sign-up.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from './interfaces/token.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (
    private httpClient: HttpClient,
    private router: Router) {}

  signUp(data: SignUpData): Observable<Token> {
    return this.httpClient.post<Token>('/api/signup', data)
      .pipe(
        map(
          (data: Token) => {
            this.setToken(data.token);
            return data;
          }
        )
    );
  }

  authenticate(data: SignInData): Observable<Token> {
    return this.httpClient.post<Token>('/api/signin', data)
      .pipe(
        map(
          (data: Token) => {
            this.setToken(data.token);
            return data;
          }
        )
      );
  }

  private setToken(token: string) {
    sessionStorage.setItem('token', 'Bearer '+token);
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('/');
  }
}