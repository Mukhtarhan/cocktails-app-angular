import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust path based on your project structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  user: any = null;
  cocktails: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get the user from AuthService
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.cocktails = this.user.cocktails || [];
      }
    });
  }

  // Navigate to the cocktail details page
  goToCocktailDetails(idDrink: string): void {
    this.router.navigate([`/drinks/${idDrink}`]);
  }
}
