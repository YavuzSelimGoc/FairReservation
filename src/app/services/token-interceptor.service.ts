import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return next.handle(req); // İstek işlenmemesi için bir sonraki işleme yönlendirme
    } else {
      const jwtToken = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });
      return next.handle(jwtToken);
    }
  }
}
