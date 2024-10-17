import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  cocktails: any[] = [];
  url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=m';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(this.url).subscribe(response => {
      this.cocktails = response.drinks;
    });
  }
}
