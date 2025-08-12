import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService
  ) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.notificationService.showError({
        message: 'Please fill in all fields',
        arabicMessage: 'يرجى ملء جميع الحقول'
      });
      return;
    }

    this.isLoading = true;
    
    // Simulate login process - replace with actual authentication
    setTimeout(() => {
      // For demo purposes, accept any email/password combination
      this.notificationService.showSuccess({
        message: 'Login successful! Welcome back!',
        arabicMessage: 'تم تسجيل الدخول بنجاح! أهلاً بك مجدداً!'
      });
      this.dialogRef.close(true);
      this.isLoading = false;
    }, 1000);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  openRegister(): void {
    this.dialogRef.close('register');
  }
}
