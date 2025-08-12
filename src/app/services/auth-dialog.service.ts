import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginComponent } from '../shared/components/login/login.component';
import { RegisterComponent } from '../shared/components/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  
  constructor(private dialog: MatDialog) {}

  openLogin(): Observable<any> {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'auth-dialog-panel'
    });

    return dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result === 'register') {
          return this.openRegister();
        }
        return [result];
      })
    );
  }

  openRegister(): Observable<any> {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'auth-dialog-panel'
    });

    return dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result === 'login') {
          return this.openLogin();
        }
        return [result];
      })
    );
  }
}
