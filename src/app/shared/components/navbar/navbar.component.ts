import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() userType: 'admin' | 'user' | null = null;

  constructor(public router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  onLogout(): void {
    // Implement logout logic
    console.log('Logout clicked');
    this.router.navigate(['/']);
  }
}
