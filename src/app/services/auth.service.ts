import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://67415a25e4647499008d72f6.mockapi.io/api/v1/users';
  private userSubject = new BehaviorSubject<any>(null);
  private user: any = null;

  constructor(private router: Router) {
    // Attempt to load user from localStorage (or any storage you prefer)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userSubject.next(this.user);
    }
  }

  getUser() {
    return this.userSubject.asObservable(); // Return the observable for the user
  }

  setUser(user: any): void {
    this.user = user;
    this.userSubject.next(user);
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await response.json();
      const foundUser = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (foundUser) {
        this.setUser(foundUser);
        alert('You have successfully logged into your account');
        this.router.navigate(['/']);
        return true;
      } else {
        alert('Invalid username or password');
        return false;
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('An error occurred while logging in');
      return false;
    }
  }

  async register(name: string, username: string, password: string): Promise<boolean> {
    if (!name || !username || !password) {
      alert('All fields are required');
      return false;
    }

    const newUser = {
      name,
      username,
      password,
      cocktails: [],
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/default.jpg',
    };

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert('Registration successful');
        return true;
      } else {
        throw new Error('Failed to register user');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      alert('An error occurred while registering');
      return false;
    }
  }

  logout(): void {
    this.user = null;
    this.userSubject.next(null); // Notify subscribers
    localStorage.removeItem('user'); // Remove from localStorage
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
