import {  Component, OnInit} from '@angular/core';
import { CartProduct} from '../../../../core/models/object-model';
import { CartServiceImpl } from '../../../../shared/services/cart.service.impl';
import Swal from 'sweetalert2';
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
  constructor(private cartService : CartServiceImpl) {  
  }
  ngOnInit(): void {
    this.cartService.getProductsFromCart().subscribe((products) => {
      this.products = products;
      this.calculateTotalPrice();
    });

    this.cartService.numberOfProductsInCart$.subscribe(() => {
      this.cartService.getProductsFromCart().subscribe((products) => {
        this.products = products;
        this.calculateTotalPrice();
      });
    });
  }
  changeProductQuantity(productId: number, quantity: string): void {
    if(Number(quantity) < 1) {
      Swal.fire("Heyy!!","Quantity must be greather than 0!", "error");
      return;
    }
    let cartLS = JSON.parse(localStorage.getItem('cart') || '[]');
      this.products.forEach((product) => {
        if (product.id === productId) {
          product.quantity = Number(quantity);
        }
      });
      cartLS.forEach((product) => {
        if (product.id === productId) {
          product.quantity = Number(quantity);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cartLS));
    this.calculateTotalPrice();
    }
  calculateTotalPrice(): void {
    this.totalPrice = 0;
    if (this.products.length > 0) {
      this.products.forEach((product) => {
        this.totalPrice += product.price * product.quantity;
      });
    }
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
