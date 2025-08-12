import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = route.data['roles'] as UserRole[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No specific roles required
    }

    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login'], { 
            queryParams: { returnUrl: state.url }
          });
          return false;
        }

        if (this.authService.hasAnyRole(requiredRoles)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  }
}
