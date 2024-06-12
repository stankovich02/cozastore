import { Component, Inject, Input,Output,EventEmitter, ViewEncapsulation  } from '@angular/core';
import { Product } from '../../../core/models/object-model';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent {

  protected wishlist: number[] = [];
  constructor(private wishlistService : WishlistServiceImpl) {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  @Input() product : Product;
  
  addProductTowishlist(productId: number,name : string): void {
    this.wishlistService.addProductToWishlist(productId,name);
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistService.updateNumberOfProductsInWishlist(this.wishlist.length);
  }
}
