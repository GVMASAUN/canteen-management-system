import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})

class UserPermissionService {
  isValid: boolean = false;
  constructor(private router: Router, private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAuthenticatedUser()) {
      this.isValid = true;
    } else {
      this.router.navigate(['/login']);
    }
    return this.isValid;
  }
}

export const UserGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(UserPermissionService).canActivate(next, state);
}

@Injectable({
  providedIn: 'root'
})

class AdminPermissionService {
  isValid: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAdminUser()) {
      this.isValid = true;
    } else {
      this.router.navigate(['/login']);
    }
    return this.isValid;
  }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminPermissionService).canActivate(next, state);
}
