import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  public sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  constructor() {}

  openSidebar(): void {
    this.sidebarVisibleSubject.next(true);
  }

  closeSidebar(): void {
    this.sidebarVisibleSubject.next(false);
  }

  toggleSidebar(isVisible?: boolean): void {
    const newState = isVisible !== undefined ? isVisible : !this.sidebarVisibleSubject.value;
    this.sidebarVisibleSubject.next(newState);
  }

  isSidebarVisible(): boolean {
    return this.sidebarVisibleSubject.value;
  }
}
