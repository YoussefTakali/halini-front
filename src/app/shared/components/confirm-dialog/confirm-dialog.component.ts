import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  arabicTitle?: string;
  arabicMessage?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="confirm-dialog" [class]="'confirm-dialog-' + (data.type || 'info')">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <i [class]="getIconClass()"></i>
          <span class="title-text">
            <span *ngIf="data.arabicTitle" class="arabic-title">{{ data.arabicTitle }}</span>
            <span class="english-title">{{ data.title }}</span>
          </span>
        </h2>
      </div>
      
      <mat-dialog-content>
        <div class="dialog-message">
          <p *ngIf="data.arabicMessage" class="arabic-message">{{ data.arabicMessage }}</p>
          <p class="english-message">{{ data.message }}</p>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()" class="cancel-btn">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-raised-button (click)="onConfirm()" class="confirm-btn" [class]="getButtonClass()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 1rem;
      border-radius: 12px;
      min-width: 300px;
    }

    .dialog-header {
      margin-bottom: 1rem;
    }

    .dialog-header h2 {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0;
      font-family: 'Playfair Display', serif;
    }

    .dialog-header i {
      font-size: 2rem;
    }

    .title-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .arabic-title {
      font-family: 'Amiri', serif;
      font-size: 1.2rem;
      color: var(--burgundy);
    }

    .english-title {
      font-size: 1.1rem;
      color: #333;
    }

    .dialog-message {
      margin: 1rem 0;
      line-height: 1.6;
    }

    .arabic-message {
      font-family: 'Amiri', serif;
      font-size: 1.1rem;
      color: var(--burgundy);
      margin-bottom: 0.5rem;
      direction: rtl;
    }

    .english-message {
      font-size: 1rem;
      color: #555;
      margin: 0;
    }

    .mat-mdc-dialog-actions {
      padding: 1rem 0 0;
      gap: 1rem;
    }

    .cancel-btn {
      color: #666;
      border: 1px solid #ddd;
    }

    .cancel-btn:hover {
      background: #f5f5f5;
    }

    .confirm-btn {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .confirm-btn-info {
      background: var(--burgundy);
      color: white;
    }

    .confirm-btn-success {
      background: #4caf50;
      color: white;
    }

    .confirm-btn-warning {
      background: #ff9800;
      color: white;
    }

    .confirm-btn-danger {
      background: #f44336;
      color: white;
    }

    .confirm-dialog-info .dialog-header i {
      color: var(--burgundy);
    }

    .confirm-dialog-success .dialog-header i {
      color: #4caf50;
    }

    .confirm-dialog-warning .dialog-header i {
      color: #ff9800;
    }

    .confirm-dialog-danger .dialog-header i {
      color: #f44336;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getIconClass(): string {
    switch (this.data.type) {
      case 'success': return 'fas fa-check-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'danger': return 'fas fa-exclamation-circle';
      default: return 'fas fa-info-circle';
    }
  }

  getButtonClass(): string {
    return `confirm-btn-${this.data.type || 'info'}`;
  }
}
