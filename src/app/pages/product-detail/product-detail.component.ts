import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Adjust path based on your project structure

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  isFavorite: boolean = false;
  user: any = null;
  private url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService // Assume an AuthService is available
  ) {}

  ngOnInit(): void {
    // Fetch user details
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.updateFavoriteStatus();
    });

    // Get product details
    const idDrink = this.route.snapshot.paramMap.get('idDrink');
    if (idDrink) {
      this.http.get<any>(this.url + idDrink).subscribe(response => {
        this.product = response.drinks ? response.drinks[0] : null;
        this.updateFavoriteStatus();
      });
    }
  }

  updateFavoriteStatus(): void {
    if (this.user && this.product) {
      // Check if the product is already in the user's favorites
      this.isFavorite = this.user.cocktails.some((c: any) => c.idDrink === this.product.idDrink);
    }
  }

  toggleFavorite(): void {
    if (!this.user) {
      alert('You need to log in to your account.');
      return;
    }

    // Update the favorites list
    const updatedCocktails = this.isFavorite
      ? this.user.cocktails.filter((c: any) => c.idDrink !== this.product.idDrink) // Remove favorite
      : [
          ...this.user.cocktails,
          {
            idDrink: this.product.idDrink,
            name: this.product.strDrink,
            image: this.product.strDrinkThumb,
            strCategory: this.product.strCategory
          }
        ]; // Add favorite

    this.user.cocktails = updatedCocktails;
    this.isFavorite = !this.isFavorite;

    // Update the user's data on the server
    this.http
      .put(`https://67415a25e4647499008d72f6.mockapi.io/api/v1/users/${this.user.id}`, this.user)
      .subscribe({
        next: () => console.log('User data updated successfully.'),
        error: (err) => console.error('Failed to update user data:', err)
      });
  }
}
