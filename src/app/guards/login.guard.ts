import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private toastrService:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(["login"]);
      this.toastrService.error("Oturum açmanız gerekmektedir.")
      localStorage.clear(); 
      return false;
    }
  }
}
