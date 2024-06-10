import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http : HttpClient) { }

  getNavigation() {
    return this.http.get('assets/data/nav.json');
  }
}
