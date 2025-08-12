import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;
  isVisible: boolean = false;
  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      this.totalItems = this.cartService.getTotalItems();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleCart(): void {
    this.isVisible = !this.isVisible;
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.notificationService.confirmRemoveItem(item.name).subscribe(confirmed => {
        if (confirmed) {
          this.cartService.removeFromCart(productId);
        }
      });
    }
  }

  clearCart(): void {
    this.notificationService.confirmClearCart().subscribe(confirmed => {
      if (confirmed) {
        this.cartService.clearCart();
        this.notificationService.showInfo({
          message: 'Cart cleared successfully',
          arabicMessage: 'تم مسح السلة بنجاح'
        });
      }
    });
  }

  checkout(): void {
    // Implement checkout logic here
    this.notificationService.showOrderSuccess();
    this.cartService.clearCart();
    this.isVisible = false;
  }
}
