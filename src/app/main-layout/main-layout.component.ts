import { Component } from '@angular/core';
import { SidebarService } from '../core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(public sidebarService: SidebarService) {}

  onSidebarToggle(isVisible: boolean): void {
    if (isVisible) {
      this.sidebarService.openSidebar();
    } else {
      this.sidebarService.closeSidebar();
    }
  }
}
