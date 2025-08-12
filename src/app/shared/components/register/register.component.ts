import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  };
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService
  ) {}

  onRegister(): void {
    if (!this.validateForm()) {
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.notificationService.showError({
        message: 'Passwords do not match',
        arabicMessage: 'كلمات المرور غير متطابقة'
      });
      return;
    }

    this.isLoading = true;
    
    // Simulate registration process - replace with actual API call
    setTimeout(() => {
      this.notificationService.showSuccess({
        message: 'Registration successful! Welcome to Hallini!',
        arabicMessage: 'تم التسجيل بنجاح! أهلاً بك في حلّيني!'
      });
      this.dialogRef.close(true);
      this.isLoading = false;
    }, 1000);
  }

  private validateForm(): boolean {
    const required = [
      this.formData.firstName,
      this.formData.lastName,
      this.formData.email,
      this.formData.phone,
      this.formData.address,
      this.formData.password,
      this.formData.confirmPassword
    ];

    if (required.some(field => !field.trim())) {
      this.notificationService.showError({
        message: 'Please fill in all fields',
        arabicMessage: 'يرجى ملء جميع الحقول'
      });
      return false;
    }

    if (this.formData.password.length < 6) {
      this.notificationService.showError({
        message: 'Password must be at least 6 characters long',
        arabicMessage: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
      });
      return false;
    }

    return true;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  openLogin(): void {
    this.dialogRef.close('login');
  }
}
