import { Injectable } from '@angular/core';
import { ICartService } from '../interfaces/icart-service';
import { CartProduct, Product } from '../../core/models/object-model';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceImpl implements ICartService{
  protected cart: CartProduct[] = [];
  private numberOfProductsInCartSubject = new BehaviorSubject<number>(0);
  numberOfProductsInCart$ = this.numberOfProductsInCartSubject.asObservable();

  constructor(private http : HttpClient) 
  {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.numberOfProductsInCartSubject.next(Number(this.cart.length));
   }
  addProductToCart(productId: number, quantity: number, name: string): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!this.isProductInCart(productId)) {
      this.cart.push({id: productId, quantity: quantity});
      localStorage.setItem('cart', JSON.stringify(this.cart));
      Swal.fire(name,"added to cart!", "success");
      return;
    }
    Swal.fire(name,"is already in cart!", "info");
  }
  isProductInCart(productId: number): boolean {
    let exists = false;
    this.cart.forEach((product) => {
      if (product.id === productId) {
        exists = true;
      }
    });
    return exists;
  }
  getProductsFromCart(): Product[] {
    throw new Error('Method not implemented.');
  }
  updateNumberOfProductsInCart(num: number): void {
    this.numberOfProductsInCartSubject.next(num);
  }
}
