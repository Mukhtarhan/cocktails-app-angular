import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchTerm: string = '';
  user: any; // Replace with a proper type if available

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  handleSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/drinks'], { queryParams: { search: this.searchTerm } });
      this.searchTerm = ''; // Clear search input
    }
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
}