import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  cocktails: any[] = [];
  loading: boolean = false;
  searchTerm: string = 'm'; // Default search term

  private baseUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Subscribe to query parameters to fetch drinks based on search term
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || 'm'; // Default to 'm' if no search term
      this.fetchCocktails();
    });
  }

  fetchCocktails(): void {
    this.loading = true;
    this.http.get(`${this.baseUrl}${this.searchTerm}`).subscribe({
      next: (response: any) => {
        this.cocktails = response.drinks || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching drinks:', error);
        this.cocktails = [];
        this.loading = false;
      }
    });
  }
}
