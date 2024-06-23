import { Injectable } from '@angular/core';
import { IWishlistService } from '../interfaces/iwishlist-service.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models/object-model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceImpl implements IWishlistService {
  public wishlist: Product[] = [];
  private numberOfProductsInWishlistSubject = new BehaviorSubject<number>(0);
  numberOfProductsInWishlist$ = this.numberOfProductsInWishlistSubject.asObservable();
  private baseUrl = 'http://localhost:5001/api/wishlists';
  constructor(private http : HttpClient) {{
     if(document.cookie.includes('jwt')){
      this.getProductsFromWishlist().subscribe((wishlist : Product[]) => {
        this.wishlist = wishlist;
        this.numberOfProductsInWishlistSubject.next(Number(this.wishlist.length));
      });
      this.numberOfProductsInWishlistSubject.next(Number(this.wishlist.length));
     }
    }
   }
  getProductsFromWishlist(): Observable<Product[]> {
      return this.http.get<Product[]>(this.baseUrl);
  }
  getNumberOfProductsInWishlist(): number {
    return this.wishlist.length;
  }  
  addProductToWishlist(productId: number,name: string): void {
    this.http.post<HttpResponse<any>>(this.baseUrl, 
      {
        productId: productId
      }, 
      { observe: 'response' }
    ).subscribe(
      response => {
        if (response.status === 201) {
          Swal.fire(name, 'is added to wishlist!', 'success');
          this.getProductsFromWishlist().subscribe((wishlist : Product[]) => {
            this.wishlist = wishlist;
            this.numberOfProductsInWishlistSubject.next(Number(this.wishlist.length));
          });
        }
      },
      error => {
        if(error.status === 409){
          Swal.fire("Hey!", error.error.error, 'info');
        }
        if(error.status == 422){
          Swal.fire("Oops!",  error.error.error, 'error');
        }
      }
    );
  }
  removeProductFromWishlist(productId: number,name: string): void {
    this.http.delete<HttpResponse<any>>(`${this.baseUrl}/${productId}` ,
      { observe: 'response' }
    ).subscribe(
      response => {
        if (response.status === 204) {
          Swal.fire(name, 'is removed from wishlist!', 'success');
          this.getProductsFromWishlist().subscribe((wishlist : Product[]) => {
            this.wishlist = wishlist;
            this.numberOfProductsInWishlistSubject.next(Number(this.wishlist.length));
          });
        }
      },
      error => {
        if(error.status === 404){
          Swal.fire("Oops!", "Product doesn't exist.", 'error');
        }
        if(error.status === 409){
          Swal.fire("Hey!", error.error.error, 'info');
        }
      }
    );
  }
  isProductInWishlist(productId: number): boolean {
    let exists = false;
    this.wishlist.forEach((product) => {
      if (product.id === productId) {
        exists = true;
      }
    });
    return exists;
  }
  updateNumberOfProductsInWishlist(num: number): void {
    this.numberOfProductsInWishlistSubject.next(num);
  }
}
