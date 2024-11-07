import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = "authToken";
const USER = "user";
const EXPIRATION_KEY = "tokenExpiration"
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static router: any;

  constructor(private router: Router) { }

   // Save the token and its expiration time to session storage
   static saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    const decodedToken = StorageService.decodeToken(token);
    const expiration = decodedToken.exp * 1000; // Convert to milliseconds
    window.sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXPIRATION_KEY, expiration.toString());

    // Check token expiration on save
    if (StorageService.isTokenExpired()) {
      StorageService.logout();
    }
  }

  // Decode JWT token
  static decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT does not have 3 parts');
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  // Check if token is expired
  static isTokenExpired(): boolean {
    const expiration = sessionStorage.getItem(EXPIRATION_KEY);
    if (!expiration) {
      return true;
    }
    return Date.now() > Number(expiration);
  }

  // Save user data to session storage
  static saveUser(user: object): void {
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, JSON.stringify(user));
  }

  // Retrieve the token from session storage
  static getToken(): string | null {
    if (StorageService.isTokenExpired()) {
      StorageService.logout();
      return null;
    }
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // Retrieve the user from session storage
  static getUser(): any {
    const userString = sessionStorage.getItem(USER) || '{}'; // Default to an empty JSON object
    return JSON.parse(userString);
  }

  // Retrieve user role from the user object
  static getUserRole(): string {
    const user = StorageService.getUser();
    if (user == null) { return ''; }
    return user.userRole;
  }

  // Check if the user has an ADMIN role
  static isAdminLoggedIn(): boolean {
    if (StorageService.getToken() === null) {
      return false;
    }
    const role: string = StorageService.getUserRole();
    return role === "ADMIN";
  }

  // Retrieve user ID from the user object
  static getUserId(): number {
    const user = StorageService.getUser();
    if (user == null) {
      return 0;
    }
    return user.id;
  }

  // Log out the user and clear session storage
  static logout(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER);
    sessionStorage.removeItem(EXPIRATION_KEY);
    if (StorageService.router) {
      StorageService.router.navigate(['/signup']);
    }
  }
}
