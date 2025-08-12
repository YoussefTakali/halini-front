import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private sidebarService: SidebarService
  ) {}

  isSidebarVisible = false;
  currentUser: User | null = null;
  dropdownOpen = false;
  searchQuery: string = '';
  cartCount = 0;
  wishlistCount = 0;
  hasWishlistItems = false;
  
  @Output() sidebarToggled = new EventEmitter<boolean>();

  ngOnInit(): void {
    // Subscribe to current user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    // Initialize cart and wishlist counts (these would typically come from services)
    this.updateCartCount();
    this.updateWishlistCount();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isClickInsideDropdown(event)) {
      this.dropdownOpen = false;
    }
  }

  private isClickInsideDropdown(event: Event): boolean {
    const target = event.target as HTMLElement;
    return target.closest('.user-dropdown') !== null;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  onHamburgerClick(event: Event): void {
    // Stop event propagation to prevent multiple triggers
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the state
    this.isSidebarVisible = !this.isSidebarVisible;
    
    console.log('NavbarComponent: Emitting toggle request', this.isSidebarVisible);
    this.sidebarToggled.emit(this.isSidebarVisible);
    
    // Also update the service
    this.sidebarService.toggleSidebar(this.isSidebarVisible);
  }

  logout(): void {
    this.authService.logout();
    this.dropdownOpen = false;
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }

  editProfile(): void {
    // Navigate to a profile edit page or show a modal
    // Replace this with your actual profile editing logic
    this.router.navigate(['/profile']);
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return '';
    
    if (this.currentUser.firstName && this.currentUser.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
    
    return this.currentUser.email?.split('@')[0] || 'User';
  }

  getUserRole(): string {
    return this.currentUser?.role ?? '';
  }

  closeMobileMenu(): void {
    this.isSidebarVisible = false;
    this.sidebarService.closeSidebar();
  }

  private updateCartCount(): void {
    // This would typically get data from a CartService
    // For now, using a mock value
    this.cartCount = 3;
  }

  private updateWishlistCount(): void {
    // This would typically get data from a WishlistService
    // For now, using a mock value
    this.wishlistCount = 5;
    this.hasWishlistItems = this.wishlistCount > 0;
  }
}
