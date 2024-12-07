import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  user: any = null; // Will hold the current user or null if logged out

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the AuthService user observable
    this.authService.getUser().subscribe((loggedInUser) => {
      this.user = loggedInUser;
    });
  }

  handleSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/drinks'], { queryParams: { search: this.searchTerm } });
      this.searchTerm = ''; // Clear search input
    }
  }

  logout(): void {
    this.authService.logout(); // AuthService will handle state update and routing
  }
}
