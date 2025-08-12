import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationUtil } from '../../../core/utils/validation.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = '';
  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // If user is already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.loginError = '';

      const { email, password, rememberMe } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.authService.setAuthData(response);
          
          // Store remember me preference
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }

          // Navigate to return URL
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = error.message || 'Login failed. Please check your credentials and try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    return labels[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  loginWithGoogle(): void {
    // Implement Google OAuth login
    console.log('Google login clicked');
    // You can implement this with Google OAuth or Firebase Auth
  }

  loginWithFacebook(): void {
    // Implement Facebook OAuth login
    console.log('Facebook login clicked');
    // You can implement this with Facebook OAuth
  }
}
