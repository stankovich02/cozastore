import {  Component, OnInit} from '@angular/core';
import { CartProduct} from '../../../../core/models/object-model';
import { CartServiceImpl } from '../../../../shared/services/cart.service.impl';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  protected products : CartProduct[] = [];
  protected totalPrice : number = 0;
  protected orderPlaced : boolean = false;
  constructor(private cartService : CartServiceImpl) {  

  }
  ngOnInit(): void {
    this.cartService.getProductsFromCart().subscribe((products) => {
      this.products = products;
      this.calculateTotalPrice();
    });

    this.cartService.numberOfProductsInCart$.subscribe(() => {
        this.calculateTotalPrice();
      });
  }
  changeProductQuantity(productId: number, quantity: string): void {
    this.cartService.changeProductQuantity(productId, Number(quantity));
    this.cartService.getProductsFromCart().subscribe((products) => {
      this.products = products;
      this.calculateTotalPrice();
    });
    }
  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.products.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    });
  }
  removeProductFromCart(productId: number,name:string): void {    
    this.cartService.removeProductFromCart(productId,name);
    this.cartService.getProductsFromCart().subscribe((products) => {
      this.products = products;
      this.calculateTotalPrice();
    });
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
