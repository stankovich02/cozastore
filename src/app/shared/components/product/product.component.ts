import { Component, Inject, Input,Output,EventEmitter, ViewEncapsulation, OnInit  } from '@angular/core';
import { CartProduct, Product } from '../../../core/models/object-model';
import { WishlistServiceImpl } from '../../services/wishlist.service.impl';
import { CartServiceImpl } from '../../services/cart.service.impl';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit{

  protected isProductInWishlist : boolean = false;
  constructor(private wishlistService : WishlistServiceImpl, private cartService : CartServiceImpl) {
    
  }
  ngOnInit(): void {
    this.isProductInWishlist = this.wishlistService.isProductInWishlist(this.product.id);
  }
  @Input() product : Product;
  
  addProductTowishlist(productId: number,name : string): void {
    if(this.isProductInWishlist){
      this.wishlistService.removeProductFromWishlist(productId,name);
      this.isProductInWishlist = false;
      return;
    }
    this.wishlistService.addProductToWishlist(productId,name);
    this.isProductInWishlist = true;
    
  }
  addProductToCart(productId: number,quantity: number,name: string): void {
    this.cartService.addProductToCart(productId,quantity,name);
  }
}
