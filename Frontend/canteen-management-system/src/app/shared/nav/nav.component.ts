import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/user/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.isAuthenticated$.subscribe(auth => this.isAuthenticated = auth);
    this.loginService.isAdmin$.subscribe(admin => this.isAdmin = admin);
    this.loginService.isUser$.subscribe(user => this.isUser = user);

    this.loadUserState();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  loadUserState(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAuthenticated = !!currentUser.token;
    this.isAdmin = currentUser.role === 'ROLE_ADMIN';
    this.isUser = currentUser.role === 'ROLE_USER';
  }

  logout(): void {
    this.loginService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }
}
