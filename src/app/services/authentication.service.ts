import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  login(email: string, password: string): boolean {
    if (password === 'admin@123' && email === 'admin@foodiedelight.com') {
      this.isAuthenticated.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    this.isAuthenticated.next(false);
    return false;
  }

  logout() {
    this.isAuthenticated.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
