import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  protected nav: any;
  protected headerClass : string  = "";
  protected numberOfProductsInCart : number = 0;
  protected numberOfProductsInWishlist : number = 0;
  constructor( private http: HttpClient, protected router: Router, private navigationService : NavigationService) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/') {
        this.headerClass = "";
      } else {
        this.headerClass = "header-v4";
      }
    });
  }
  ngOnInit(): void {
    this.getNav();
  }


  getNav() {
    this.navigationService.getNavigation().subscribe((data)=>{
      this.nav = data;
    });
  }
}
