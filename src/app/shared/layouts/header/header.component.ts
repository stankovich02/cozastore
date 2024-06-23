import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';
import { CartServiceImpl } from '../../services/cart.service.impl';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nav: any;
  headerClass: string = '';
  numberOfProductsInCart: number = 0;
  numberOfProductsInWishlist: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private wishlistService: WishlistServiceImpl,
    private cartService: CartServiceImpl,
    private authService: AuthService
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/') {
        this.headerClass = '';
      } else {
        this.headerClass = 'header-v4';
      }
    });

    this.numberOfProductsInWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]').length;
    this.numberOfProductsInCart = JSON.parse(localStorage.getItem('cart') || '[]').length;
  }

  ngOnInit(): void {
    this.getNav();
    this.wishlistService.numberOfProductsInWishlist$.subscribe(num => {
      this.numberOfProductsInWishlist = num;
    });
    this.cartService.numberOfProductsInCart$.subscribe(num => {
      this.numberOfProductsInCart = num;
    });
    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getNav() {
    this.navigationService.getNavigation().subscribe(data => {
      this.nav = data;
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.status === 204) {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        alert(err.error.error);
      }
    });
  }
}
