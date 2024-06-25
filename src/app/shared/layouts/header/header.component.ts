import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';
import { CartServiceImpl } from '../../services/cart.service.impl';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

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
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private wishlistService: WishlistServiceImpl,
    private cartService: CartServiceImpl,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/') {
        this.headerClass = '';
      } else {
        this.headerClass = 'header-v4';
      }
    });
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
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.sharedService.callHeaderMethod$.subscribe(() => {
      this.handleSessionExpired();
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
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
          this.numberOfProductsInCart = 0;
          this.numberOfProductsInWishlist = 0;
          this.wishlistService.wishlist = [];
          this.cartService.cart = [];
          this.authService.getLoggedInSubject().next(false);
        }
      },
      error: err => {
        console.log(err);
        
      }
    });
  }
  handleSessionExpired() {
    this.numberOfProductsInCart = 0;
    this.numberOfProductsInWishlist = 0;
    this.wishlistService.wishlist = [];
    this.cartService.cart = [];
    this.authService.getLoggedInSubject().next(false);
  }
}
