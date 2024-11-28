import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { LoginService } from 'src/app/services/user/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;
  public isUser: boolean = false;
  private roles = Role;

  constructor(private loginService: LoginService, private router: Router) { }

  public ngOnInit() {
    this.loginService.isAuthenticated$.subscribe(auth => this.isAuthenticated = auth);
    this.loginService.isAdmin$.subscribe(admin => this.isAdmin = admin);
    this.loginService.isUser$.subscribe(user => this.isUser = user);

    this.loadUserState();
  }

  get navigationItems() {
    return [
      { label: 'Orders', link: '/order', show: ((this.isUser === true) || (this.isAdmin === true)) },
      { label: 'Food Items', link: '/food-item', show: this.isAdmin === true },
      { label: 'Users', link: '/user', show: this.isAdmin === true },
      { label: 'All Orders', link: '/all-orders', show: this.isAdmin === true },
      { label: 'Snackology', link: '/login', show: this.isAuthenticated === false }
    ];
  }

  public isActive(route: string): boolean {
    let basePath = this.router.url.split('/');
    let segment = '/' + basePath[1];
    return segment === route;
  }

  private loadUserState(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAuthenticated = !!currentUser.token;
    this.isAdmin = currentUser.role === this.roles.Admin;
    this.isUser = currentUser.role === this.roles.User;
  }

  public logout(): void {
    this.loginService.logout();
  }
}
