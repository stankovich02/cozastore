import { Component, OnInit } from '@angular/core';
import { WishlistServiceImpl } from '../../../../../shared/services/wishlist.service.impl';
import { Product } from '../../../../../core/models/object-model';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  protected products : Product[] = [];
  constructor(private wishlistService : WishlistServiceImpl,private authService: AuthService,private router: Router) {  
   
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      if(this.authService.isAdmin()){
        this.router.navigate(['/home']);
      }
      this.wishlistService.getProductsFromWishlist().subscribe((wishlist) => {
        this.products = wishlist;
      });
    }
    else{
      this.router.navigate(['/login']);
    }

    this.wishlistService.numberOfProductsInWishlist$.subscribe(() => {
     this.products = this.wishlistService.wishlist;
    });
  }
}
