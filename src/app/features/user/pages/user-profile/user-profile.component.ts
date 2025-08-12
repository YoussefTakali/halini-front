import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    bio: 'Software developer with a passion for creating innovative solutions.',
    location: 'New York, NY',
    website: 'https://johndoe.dev'
  };

  isEditing = false;
  isDirty = false;

  constructor() {}

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    // Simulate API call to load user profile
    console.log('Loading user profile...');
  }

  toggleEdit(): void {
    if (this.isEditing && this.isDirty) {
      if (confirm('You have unsaved changes. Do you want to save them?')) {
        this.saveProfile();
      }
    }
    this.isEditing = !this.isEditing;
  }

  onProfileChange(): void {
    this.isDirty = true;
  }

  saveProfile(): void {
    // Simulate API call to save profile
    console.log('Saving profile:', this.userProfile);
    this.isEditing = false;
    this.isDirty = false;
    
    // Show success message
    alert('Profile updated successfully!');
  }

  cancelEdit(): void {
    if (this.isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        this.loadProfile(); // Reload original data
        this.isEditing = false;
        this.isDirty = false;
      }
    } else {
      this.isEditing = false;
    }
  }
}
