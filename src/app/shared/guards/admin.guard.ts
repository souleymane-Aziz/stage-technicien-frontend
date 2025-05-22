import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    localStorage.setItem('current_demande_link_app', JSON.stringify(state.url));
    if (localStorage.getItem('current_session_app')) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
