import { Component, Inject, Input,Output,EventEmitter, ViewEncapsulation  } from '@angular/core';
import { CartProduct, Product } from '../../../core/models/object-model';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';
import { CartServiceImpl } from '../../services/cart.service.impl';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent {

  protected wishlist: number[] = [];
  constructor(private wishlistService : WishlistServiceImpl, private cartService : CartServiceImpl) {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  @Input() product : Product;
  
  addProductTowishlist(productId: number,name : string): void {
    this.wishlistService.addProductToWishlist(productId,name);
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistService.updateNumberOfProductsInWishlist(this.wishlist.length);
  }
  addProductToCart(productId: number,quantity: number,name: string): void {
    this.cartService.addProductToCart(productId,quantity,name);
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartService.updateNumberOfProductsInCart(cart.length);
  }
}
