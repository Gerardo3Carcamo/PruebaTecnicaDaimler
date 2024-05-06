import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
  constructor(private alert: AlertService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('hospitium-id') != null){
        return true;
      }else{
        this.alert.error('Error', 'No puede navegar a esta URL hasta que inicie sesión.')
        this.redirect('')
      }
      return localStorage.getItem('hospitium-id') != null ? true : false;
  }
  redirect(url) {
    const navigationDetails: string[] = [url];
    this.router.navigate(navigationDetails);
  }
}
