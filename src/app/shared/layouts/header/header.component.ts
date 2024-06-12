import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  protected nav: any;
  protected headerClass : string  = "";
  protected numberOfProductsInCart : number = 0;
  protected numberOfProductsInWishlist: number = 0;
  constructor(protected router: Router, private navigationService : NavigationService, private wishlistService : WishlistServiceImpl) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/') {
        this.headerClass = "";
      } else {
        this.headerClass = "header-v4";
      }
    });
    this.numberOfProductsInWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]').length;
  }

  ngOnInit(): void {
    this.getNav();
    this.wishlistService.numberOfProductsInWishlist$.subscribe(num => {
      this.numberOfProductsInWishlist = num;
  });
  }


  getNav() {
    this.navigationService.getNavigation().subscribe((data)=>{
      this.nav = data;
    });
  }
}
