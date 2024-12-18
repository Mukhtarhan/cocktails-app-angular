import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileComponent } from './pages/profile/profile.component'; // Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    DrinksComponent,
    ProductDetailComponent,
    LoginComponent,
    FavouritesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
