import { Injectable } from '@angular/core';
import { IWishlistService } from '../interfaces/iwishlist-service.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models/object-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceImpl implements IWishlistService {
  protected wishlist: number[] = [];
  private numberOfProductsInWishlistSubject = new BehaviorSubject<number>(0);
  numberOfProductsInWishlist$ = this.numberOfProductsInWishlistSubject.asObservable();
  constructor(private http : HttpClient) {{
      this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      this.numberOfProductsInWishlistSubject.next(Number(this.wishlist.length));
    }
   }
  getProductsFromWishlist(): Product[] {
    let array = [];   
      this.http.get<Product[]>('/assets/data/products.json').subscribe((products) => {
        products.forEach((product) => {
          if (this.wishlist.includes(product.id)) {
            array.push(product);
          }
        });
      });
    return array;
  }
  addProductToWishlist(productId: number, name: string): void {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!this.isProductInWishlist(productId)) {
      this.wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      Swal.fire(name, "is added to wishlist!", "success");
      return;
    }
    this.removeProductFromWishlist(productId);
    Swal.fire(name, "is removed from wishlist!", "success");
  }
  removeProductFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter((id) => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
  isProductInWishlist(productId: number): boolean {
    return this.wishlist.includes(productId);
  }
  updateNumberOfProductsInWishlist(num: number): void {
    this.numberOfProductsInWishlistSubject.next(num);
  }
}
