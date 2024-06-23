import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CartServiceImpl } from '../../../../../shared/services/cart.service.impl';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  protected userAddress = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
    country: '',
    paymentType: ''
  }
  protected errors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
    country: '',
    paymentType: ''
  }
  constructor(private authService: AuthService,private router: Router,private http: HttpClient,private cartService: CartServiceImpl){}
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    if(this.cartService.cart.length == 0){
      this.router.navigate(['/cart']);
    }
  }
  createOrder(): void {
    this.http.post<HttpResponse<any>>('http://localhost:5001/api/orders', {
      firstName: this.userAddress.firstName,
      lastName: this.userAddress.lastName,
      email: this.userAddress.email,
      phone: this.userAddress.phone,
      address: this.userAddress.address,
      city: this.userAddress.city,
      zipcode: this.userAddress.zipcode,
      country: this.userAddress.country,
      paymentTypeId: this.userAddress.paymentType
    }, {observe: 'response'}).subscribe(
      response => {
        if (response.status === 201) {
          this.userAddress = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipcode: '',
            country: '',
            paymentType: ''
          };
          this.errors = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipcode: '',
            country: '',
            paymentType: ''
          };
          this.cartService.updateNumberOfProductsInCart(0);
          Swal.fire("Thank you!", "Your order has been confirmed successfully!", "success").then((result) => {
            if (result.isConfirmed) {
             this.router.navigate(['/home']);
            }
          })
        }
      },
      error => {
        if(error.status === 409){
          Swal.fire("Hey!", error.error.error, 'info');
        }
        if(error.status == 422){
          this.errors = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipcode: '',
            country: '',
            paymentType: ''
          };
          error.error.forEach(element => {
            switch (element.property) {
              case 'Email':
                this.errors.email = element.error;
                break;
              case 'FirstName':
                this.errors.firstName = element.error;
                break;
              case 'LastName':
                this.errors.lastName = element.error;
                break;
              case 'Phone':
                this.errors.phone = element.error;
                break;
              case 'Address':
                this.errors.address = element.error;
                break;
              case 'City':
                this.errors.city = element.error;
                break;
              case 'ZipCode':
                this.errors.zipcode = element.error;
                break;
              case 'Country':
                this.errors.country = element.error;
                break;
              case 'PaymentTypeId':
                this.errors.paymentType = element.error;
                break;
            }
          });
        }
      }
    );
  }
}
