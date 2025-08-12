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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track route changes
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });

    // Set initial route
    this.currentRoute = this.router.url;
  }

  get currentNavItems(): NavItem[] {
    return this.defaultNavItems;
  }
}
