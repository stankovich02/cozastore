import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  protected title : string = '';
 
  constructor(protected router: Router) {
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let segments = this.router.url.split('/');
      this.title = segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1);
    });
   }
}
