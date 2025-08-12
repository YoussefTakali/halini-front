import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: new Date('2023-01-15')
  };

  recentActivities = [
    { action: 'Profile updated', date: new Date('2023-08-10') },
    { action: 'Password changed', date: new Date('2023-08-05') },
    { action: 'Account created', date: new Date('2023-01-15') }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    // Simulate API call
    console.log('Loading user dashboard data...');
  }
}
