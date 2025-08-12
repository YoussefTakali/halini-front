import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavItem } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentRoute = '';
  userType: 'admin' | 'user' | null = null;

  // Default navigation items for the sweets website
  defaultNavItems: NavItem[] = [
    { label: 'Home', path: '/', icon: 'fas fa-home' },
    { 
      label: 'Products', 
      path: '/products',
      icon: 'fas fa-cookie-bite',
      children: [
        { label: 'Traditional Sweets', path: '/products/traditional' },
        { label: 'Premium Collection', path: '/products/premium' },
        { label: 'Gift Boxes', path: '/products/gifts' },
        { label: 'Seasonal Specials', path: '/products/seasonal' }
      ]
    },
    { label: 'About Us', path: '/about', icon: 'fas fa-heart' },
    { label: 'Contact', path: '/contact', icon: 'fas fa-phone' }
  ];

  // Admin navigation items
  adminNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
    { 
      label: 'Management', 
      path: '/admin/management',
      icon: 'fas fa-cog',
      children: [
        { label: 'Users', path: '/admin/users' },
        { label: 'Settings', path: '/admin/settings' },
        { label: 'Reports', path: '/admin/reports' }
      ]
    },
    { label: 'Analytics', path: '/admin/analytics', icon: 'fas fa-chart-bar' }
  ];

  // User navigation items
  userNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/user/dashboard', icon: 'fas fa-home' },
    { label: 'Profile', path: '/user/profile', icon: 'fas fa-user' },
    { label: 'Settings', path: '/user/settings', icon: 'fas fa-cog' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track route changes
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.updateUserType();
      });

    // Set initial route
    this.currentRoute = this.router.url;
    this.updateUserType();
  }

  private updateUserType(): void {
    if (this.currentRoute.startsWith('/admin')) {
      this.userType = 'admin';
    } else if (this.currentRoute.startsWith('/user')) {
      this.userType = 'user';
    } else {
      this.userType = null;
    }
  }

  get currentNavItems(): NavItem[] {
    switch (this.userType) {
      case 'admin':
        return this.adminNavItems;
      case 'user':
        return this.userNavItems;
      default:
        return this.defaultNavItems;
    }
  }
}
