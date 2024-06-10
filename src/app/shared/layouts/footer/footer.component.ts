import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor( private http: HttpClient, protected router: Router, private navigationService : NavigationService) {
  }
  protected nav: any;
  ngOnInit(): void {
     this.getNav();
   }
 
 
   getNav() {
    this.navigationService.getNavigation().subscribe((data)=>{
      this.nav = data;
    });
  }
}
