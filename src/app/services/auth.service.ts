import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { RegisterData } from '../shared/components/register/register.component';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('hallini_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call - In real app, this would be an HTTP request
    return new Observable(observer => {
      // Check if user exists in localStorage (simple demo)
      const users = JSON.parse(localStorage.getItem('hallini_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        
        this.currentUserSubject.next(userWithoutPassword);
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('hallini_user', JSON.stringify(userWithoutPassword));
        
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  register(userData: RegisterData): Observable<boolean> {
    return new Observable(observer => {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('hallini_users') || '[]');
      
      // Check if email already exists
      const emailExists = users.some((u: any) => u.email === userData.email);
      
      if (emailExists) {
        observer.next(false);
        observer.complete();
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: userData.password, // In real app, this would be hashed
        role: 'user' // Default role for new users
      };
      
      // Save to users array
      users.push(newUser);
      localStorage.setItem('hallini_users', JSON.stringify(users));
      
      // Auto login after registration
      const { password, ...userWithoutPassword } = newUser;
      
      this.currentUserSubject.next(userWithoutPassword);
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('hallini_user', JSON.stringify(userWithoutPassword));
      
      observer.next(true);
      observer.complete();
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('hallini_user');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    // In a real app, this would return the JWT token
    const user = this.getCurrentUser();
    return user ? `token_${user.id}` : null;
  }

  hasAnyRole(roles: string[]): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.role) {
      return false;
    }
    return roles.includes(currentUser.role);
  }

  getUserRole(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser?.role || null;
  }
}
