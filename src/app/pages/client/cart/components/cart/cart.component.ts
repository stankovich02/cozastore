import {  Component, OnInit} from '@angular/core';
import { CartProduct} from '../../../../../core/models/object-model';
import { CartServiceImpl } from '../../../../../shared/services/cart.service.impl';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  protected products : CartProduct[] = [];
  protected totalPrice : number = 0;
  protected orderPlaced : boolean = false;
  constructor(private cartService : CartServiceImpl,private authService: AuthService,private router: Router) {
  
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.cartService.getProductsFromCart().subscribe((cart) => {
        this.products = cart;
        this.calculateTotalPrice();
      });
    }
    else{
      this.router.navigate(['/login']);
    }

    this.cartService.numberOfProductsInCart$.subscribe(() => {
        this.calculateTotalPrice();
      });
  }
  changeProductQuantity(productId: number, quantity: string): void {
    this.cartService.changeProductQuantity(productId, Number(quantity)).subscribe(
      response => {
        if (response.status === 204) {
          this.cartService.getProductsFromCart().subscribe((cart : CartProduct[]) => {
            this.cartService.cart = cart;
            this.products = cart;
            this.calculateTotalPrice();
          })
        }
      },
      error => {
        if(error.status === 404){
          Swal.fire("Oops!", "Product doesn't exist", 'error');
        }
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
  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.products.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    });
  }
  removeProductFromCart(productId: number,name:string): void {    
    this.cartService.removeProductFromCart(productId).subscribe(
      response => {
        if (response.status === 204) {
          this.cartService.getProductsFromCart().subscribe((cart : CartProduct[]) => {
            this.cartService.cart = cart;
            this.products = cart;
            this.calculateTotalPrice();
            this.cartService.updateNumberOfProductsInCart(this.products.length);
            Swal.fire(name, 'is removed from cart!', 'success');
          })
        }
      },
      error => {
        if(error.status === 404){
          Swal.fire("Oops!", "Product doesn't exist", 'error');
        }
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
  placeOrder(): void {
    this.orderPlaced = true;
    this.cartService.updateNumberOfProductsInCart(0);
    localStorage.removeItem('cart');
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}
