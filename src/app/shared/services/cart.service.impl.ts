import { Injectable } from '@angular/core';
import { ICartService } from '../interfaces/icart-service';
import { CartProduct, Product } from '../../core/models/object-model';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceImpl implements ICartService{
  public cart: CartProduct[] = [];
  private numberOfProductsInCartSubject = new BehaviorSubject<number>(0);
  numberOfProductsInCart$ = this.numberOfProductsInCartSubject.asObservable();
  private baseUrl = 'http://localhost:5001/api/carts';
  constructor(private http : HttpClient) 
  {
    if(document.cookie.includes('jwt')){
      this.getProductsFromCart().subscribe((cart : CartProduct[]) => {
        this.cart = cart;
        this.numberOfProductsInCartSubject.next(Number(this.cart.length));
      });
     }
   }
  addProductToCart(productId: number, quantity: number, name: string): void {
    this.http.post<HttpResponse<any>>(this.baseUrl, 
      {
        productId: productId,
        quantity: quantity
      }, 
      { observe: 'response' }
    ).subscribe(
      response => {
        if (response.status === 201) {
          Swal.fire(name, 'is added to cart!', 'success');
          this.getProductsFromCart().subscribe((cart : CartProduct[]) => {
            this.cart = cart;
            this.numberOfProductsInCartSubject.next(Number(this.cart.length));
          });
        }
      },
      error => {
        if(error.status === 409){
          Swal.fire("Hey!", error.error.error, 'info');
        }
        if(error.status == 422){
          console.log(error);
          Swal.fire("Oops!",  error.error[0].error, 'error');
        }
      }
    );
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
  getProductsFromCart(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(this.baseUrl);
}
  changeProductQuantity(productId: number, quantity: number): Observable<any> {
     return this.http.put<HttpResponse<any>>(this.baseUrl, 
      {
        productId: productId,
        quantity: quantity
      }, 
      { observe: 'response' }
    );
  }
  removeProductFromCart(productId: number): Observable<any> {
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/${productId}`, 
      { observe: 'response' }
    );
  }
  updateNumberOfProductsInCart(num: number): void {
    this.numberOfProductsInCartSubject.next(num);
  }
}
