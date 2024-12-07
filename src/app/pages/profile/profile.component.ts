import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Holds the logged-in user data
  editableUser: any = null; // Temporarily holds the data for editing
  isEditing = false; // Tracks if the user is in edit mode

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((loggedInUser) => {
      this.user = loggedInUser;
      this.editableUser = { ...this.user }; // Create a copy for editing
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editableUser = { ...this.user }; // Reset the changes
  }

  async saveChanges(): Promise<void> {
    if (!this.editableUser.id) return;

    const success = await this.authService.updateUser(this.editableUser);
    if (success) {
      alert('Profile updated successfully!');
      this.isEditing = false;
    } else {
      alert('Failed to update profile. Please try again.');
    }
  }

  logout(): void {
    this.authService.logout();
    alert('You have logged out.');
    this.router.navigate(['/login']);
  }
}
