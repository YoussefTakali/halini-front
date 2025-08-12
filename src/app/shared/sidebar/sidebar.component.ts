import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() isSidebarVisible: boolean = false;
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    public router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Subscribe to sidebar service state
    this.subscriptions.add(
      this.sidebarService.sidebarVisible$.subscribe(isVisible => {
        this.isSidebarVisible = isVisible;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSidebarVisible']) {
      console.log('Sidebar visibility changed:', this.isSidebarVisible);
    }
  }

  closeSidebarOnMobile(): void {
    // Close sidebar on mobile devices after navigation
    if (window.innerWidth <= 768) {
      this.sidebarService.closeSidebar();
    }
  }
}