import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDialogService } from '../../../services/auth-dialog.service';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() navItems: NavItem[] = [];
  @Input() brand = 'Hallini';
  
  isAuthenticated = false;
  currentUser: any = null;

  constructor(
    public router: Router,
    private authDialogService: AuthDialogService
  ) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  onLogin(): void {
    this.authDialogService.openLogin().subscribe(result => {
      if (result === true) {
        // For demo purposes, simulate login
        this.isAuthenticated = true;
        this.currentUser = { firstName: 'User' };
        console.log('Login successful');
      }
    });
  }

  onRegister(): void {
    this.authDialogService.openRegister().subscribe(result => {
      if (result === true) {
        // For demo purposes, simulate registration
        this.isAuthenticated = true;
        this.currentUser = { firstName: 'User' };
        console.log('Registration successful');
      }
    });
  }

  onLogout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
