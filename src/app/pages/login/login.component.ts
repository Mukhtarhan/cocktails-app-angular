import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegistering = false;
  name = '';
  username = '';
  password = '';
  confirmPassword = '';
  formError: string | null = null;
  authError: string | null = null;

  constructor(private authService: AuthService) {}

  setIsRegistering(value: boolean): void {
    this.isRegistering = value;
    this.clearFields();
  }

  clearFields(): void {
    this.name = '';
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.formError = null;
    this.authError = null;
  }

  async handleSubmit(): Promise<void> {
    this.formError = null;

    if (this.isRegistering) {
      if (this.password !== this.confirmPassword) {
        this.formError = 'Passwords do not match!';
        return;
      }

      const success = await this.authService.register(
        this.name,
        this.username,
        this.password
      );

      if (success) {
        alert('Registration successful! You can now log in.');
        this.setIsRegistering(false);
      } else {
        this.formError = 'Registration failed. Please try again.';
      }
    } else {
      const success = await this.authService.login(this.username, this.password);

      if (!success) {
        this.authError = 'Invalid username or password.';
      }
    }
  }
}
