import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Import core services, guards, and interceptors here when created
// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './guards/auth.guard';
// import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // Core services go here
    // AuthService,
    // AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true
    // }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only once in AppModule.');
    }
  }
}
