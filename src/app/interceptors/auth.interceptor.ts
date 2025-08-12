import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const authToken = this.authService.getToken();
    
    // If we have a token, clone the request and add the authorization header
    if (authToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    }
    
    // If no token, proceed with the original request
    return next.handle(request);
  }
}
