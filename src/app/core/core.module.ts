import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from './services/auth.service';
import { SidebarService } from './services/sidebar.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // Services
    AuthService,
    SidebarService,
    
    // Guards
    AuthGuard,
    RoleGuard,
    
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
