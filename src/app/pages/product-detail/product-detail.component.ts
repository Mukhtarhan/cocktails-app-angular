import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idDrink');
    this.http.get<any>(this.url + id).subscribe(response => {
      this.product = response.drinks[0];
    });
  }
}
