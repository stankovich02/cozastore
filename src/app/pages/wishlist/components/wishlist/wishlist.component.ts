import { Component, OnInit } from '@angular/core';
import { WishlistServiceImpl } from '../../../../shared/services/wishlist.service.impl';
import { Product } from '../../../../core/models/object-model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  protected products : Product[] = [];
  constructor(private wishlistService : WishlistServiceImpl) {  
  }
  ngOnInit(): void {
    this.products = this.wishlistService.getProductsFromWishlist();
    this.wishlistService.numberOfProductsInWishlist$.subscribe(() => {
      this.products = this.wishlistService.getProductsFromWishlist();
  });
  }
}
