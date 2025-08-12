import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:category', component: ProductsComponent },
      { 
        path: 'admin', 
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
      },
      { 
        path: 'user', 
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
      },
      // Add more routes as needed
      { path: 'about', redirectTo: '/', pathMatch: 'full' },
      { path: 'contact', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
