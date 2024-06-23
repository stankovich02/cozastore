import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuthResponse } from '../../../../core/models/object-model';
import { Router } from '@angular/router';
import { WishlistServiceImpl } from '../../../../shared/services/wishlist.service.impl';
import { CartServiceImpl } from '../../../../shared/services/cart.service.impl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService : AuthService,private router: Router,private wishlistService: WishlistServiceImpl,private cartService: CartServiceImpl){}
  ngOnInit(): void {
    if(document.cookie.includes('sessionExpired')){
      document.cookie = 'sessionExpired=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
  protected email: string = 'testtest@gmail.com';
  protected password: string = 'Test1234';
  protected error : string | void = '';

  login() {
    this.authService.login({ email: this.email, password: this.password } ).subscribe({
      next: (response: HttpResponse<AuthResponse>) => {
        if (response.status === 200) {
          this.error = '';
          this.router.navigate(['/home']);
          this.wishlistService.getProductsFromWishlist().subscribe((wishlist) => {
            this.wishlistService.updateNumberOfProductsInWishlist(wishlist.length);
            this.wishlistService.wishlist = wishlist;
          });
          this.cartService.getProductsFromCart().subscribe((cart) => {
            this.cartService.updateNumberOfProductsInCart(cart.length);
            this.cartService.cart = cart;
          });
        }
      },
      error: err => {
        if (err.status === 409) {
          this.error = err.error.error;  
        }
      }
    });
  }
}