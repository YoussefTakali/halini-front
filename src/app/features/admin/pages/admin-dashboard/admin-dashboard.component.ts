import { Component, OnInit } from '@angular/core';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  pendingOrders: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalUsers: 1250,
    activeUsers: 892,
    totalRevenue: 45680,
    pendingOrders: 23
  };

  recentActivities = [
    { action: 'New user registration', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Order completed', user: 'Jane Smith', time: '5 minutes ago' },
    { action: 'Support ticket created', user: 'Mike Johnson', time: '10 minutes ago' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Simulate API call
    console.log('Loading dashboard data...');
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
