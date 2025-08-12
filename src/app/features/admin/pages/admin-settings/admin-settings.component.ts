import { Component, OnInit } from '@angular/core';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxFileSize: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  settings: SystemSettings = {
    siteName: 'Hallini',
    siteDescription: 'Your trusted platform for innovative solutions',
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: 10,
    emailNotifications: true,
    smsNotifications: false
  };

  isDirty = false;

  constructor() {}

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    // Simulate API call to load settings
    console.log('Loading system settings...');
  }

  onSettingChange(): void {
    this.isDirty = true;
  }

  saveSettings(): void {
    // Simulate API call to save settings
    console.log('Saving settings:', this.settings);
    this.isDirty = false;
    
    // Show success message (you can implement a toast service)
    alert('Settings saved successfully!');
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.loadSettings();
      this.isDirty = false;
    }
  }
}
