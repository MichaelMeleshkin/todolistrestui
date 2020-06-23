import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      })
    } else {
      this.router.navigateByUrl('/signin');
    }
    return next.handle(req);
  }
}