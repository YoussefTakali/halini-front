import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/components/confirm-dialog/confirm-dialog.component';

export interface NotificationConfig {
  message: string;
  arabicMessage?: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  action?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  showSuccess(config: NotificationConfig): void {
    const message = this.formatMessage(config);
    const snackBarConfig: MatSnackBarConfig = {
      duration: config.duration || 4000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    };
    
    this.snackBar.open(message, config.action || '✓', snackBarConfig);
  }

  showError(config: NotificationConfig): void {
    const message = this.formatMessage(config);
    const snackBarConfig: MatSnackBarConfig = {
      duration: config.duration || 6000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    };
    
    this.snackBar.open(message, config.action || '✗', snackBarConfig);
  }

  showWarning(config: NotificationConfig): void {
    const message = this.formatMessage(config);
    const snackBarConfig: MatSnackBarConfig = {
      duration: config.duration || 5000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    };
    
    this.snackBar.open(message, config.action || '⚠', snackBarConfig);
  }

  showInfo(config: NotificationConfig): void {
    const message = this.formatMessage(config);
    const snackBarConfig: MatSnackBarConfig = {
      duration: config.duration || 4000,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    };
    
    this.snackBar.open(message, config.action || 'ℹ', snackBarConfig);
  }

  showCartSuccess(productName: string, arabicName?: string): void {
    const message = arabicName 
      ? `تمت إضافة ${arabicName} إلى السلة!\n${productName} added to cart!`
      : `${productName} added to cart!`;
    
    this.showSuccess({
      message,
      duration: 3000,
      action: '🛒'
    });
  }

  showRemoveFromCart(productName: string, arabicName?: string): void {
    const message = arabicName 
      ? `تم حذف ${arabicName} من السلة\n${productName} removed from cart`
      : `${productName} removed from cart`;
    
    this.showWarning({
      message,
      duration: 3000,
      action: '🗑️'
    });
  }

  showOrderSuccess(): void {
    this.showSuccess({
      message: 'تم إرسال طلبكم بنجاح! سيتم التواصل معكم قريباً.\nYour order has been sent successfully! We will contact you soon.',
      duration: 5000,
      action: '🎉'
    });
  }

  private formatMessage(config: NotificationConfig): string {
    if (config.arabicMessage) {
      return `${config.arabicMessage}\n${config.message}`;
    }
    return config.message;
  }

  // For more complex confirmations
  openConfirmDialog(config: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: config,
      disableClose: true,
      panelClass: 'custom-dialog-panel'
    });

    return dialogRef.afterClosed();
  }

  // Quick confirmation dialogs
  confirmClearCart(): Observable<boolean> {
    return this.openConfirmDialog({
      title: 'Clear Cart',
      message: 'Are you sure you want to remove all items from your cart?',
      arabicTitle: 'مسح السلة',
      arabicMessage: 'هل أنت متأكد من أنك تريد إزالة جميع العناصر من السلة؟',
      type: 'warning',
      confirmText: 'Yes, Clear Cart',
      cancelText: 'Cancel'
    });
  }

  confirmRemoveItem(productName: string): Observable<boolean> {
    return this.openConfirmDialog({
      title: 'Remove Item',
      message: `Remove ${productName} from your cart?`,
      arabicTitle: 'حذف العنصر',
      arabicMessage: `حذف ${productName} من السلة؟`,
      type: 'danger',
      confirmText: 'Remove',
      cancelText: 'Keep'
    });
  }
}
