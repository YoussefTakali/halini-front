import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { API_CONFIG, LOCAL_STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE_URL = API_CONFIG.BASE_URL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check for existing session on service initialization
    this.checkExistingSession();
  }

  private checkExistingSession(): void {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    const userStr = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.tokenSubject.next(token);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearSession();
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // For now, return a mock response
    // Replace this with actual HTTP call to your backend
    return of({
      user: {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'mock-jwt-token'
    });
    
    // Uncomment and modify this when you have a backend:
    // return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // For now, return a mock response
    // Replace this with actual HTTP call to your backend
    return of({
      user: {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'mock-jwt-token'
    });
    
    // Uncomment and modify this when you have a backend:
    // return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/register`, userData);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  private clearSession(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, authResponse.token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
    this.tokenSubject.next(authResponse.token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null && this.getToken() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }
}
