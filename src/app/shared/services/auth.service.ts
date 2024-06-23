import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../../core/models/object-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    const token = this.getTokenFromCookie();
    return token !== null;
  }
  getLoggedInSubject(): BehaviorSubject<boolean> {
    return this.loggedInSubject;
  }

  login(credentials: { email: string, password: string }): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      'http://localhost:5001/api/auth', 
      credentials, 
      { observe: 'response'},
    ).pipe(
      tap(response => {
          this.loggedInSubject.next(true);
      })
    );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.delete('http://localhost:5001/api/auth/', { observe: 'response' }).pipe(
      tap(() =>this.loggedInSubject.next(false)));
  }

  private getTokenFromCookie(): string | null {
    const name = 'jwt=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
}
