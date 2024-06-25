import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountAPI, PagedResponse, Product, ValidatonError } from '../../../../core/models/object-model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent implements OnInit{
  constructor(protected router: Router,private http: HttpClient,private route: ActivatedRoute) { }
  private baseUrl = 'http://localhost:5001/api/';
  private id = "0";
  ngOnInit(): void {
    this.http.get<PagedResponse<Product>>(`${this.baseUrl}products?perPage=100&isActive=True`).subscribe((response)=>{
      this.products = response.data;
      if(this.router.url.includes('update')){
       
        this.id = this.route.snapshot.paramMap.get('id');
        this.http.get<DiscountAPI>(`${this.baseUrl}discounts/${this.id}`,{observe: 'response'}).subscribe(
          response=>{
            
            let productID = this.products.filter((product)=>product.name === response.body.product)[0].id;
            let dateTo = new Date(response.body.dateTo).toISOString();
            let dateToDate = dateTo.split('T')[0];
            let dateToTime = dateTo.split('T')[1].split('.')[0];
            let dateFrom = new Date(response.body.dateFrom).toISOString();
            let dateFromDate = dateFrom.split('T')[0];
            let dateFromTime = dateFrom.split('T')[1].split('.')[0];
            console.log(dateTo,dateFrom);
            
            this.discount = {
              productId: productID,
              discountPercent: response.body.discountPercent,
              dateFrom: dateFromDate + ' ' + dateFromTime,
              dateTo: dateToDate + ' ' + dateToTime
            }
          },
          error=>{
            if(error.status === 404){
              Swal.fire("Error", "Discount not found", "error");
            }
          });
        }
    });
    
  }
  protected products: Product[] = [];
  protected discount = {
    productId: 0,
    discountPercent: 0,
    dateFrom: '1970-01-01',
    dateTo: '1970-01-01',
  };
  protected errors = {
    productId: '',
    discountPercent: '',
    dateFrom: '',
    dateTo: ''
  };
  addDiscount() {
    this.http.post(`${this.baseUrl}discounts`, this.discount, {observe: 'response'}).subscribe(
      response=>{
      this.errors = {
        productId: '',
        discountPercent: '',
        dateFrom: '',
        dateTo: ''
      };
      if(response.status == 201){
        Swal.fire("Success", "Discount added successfully.", "success").then(() => {
          this.router.navigate(['/admin/discounts']);
        });
      }
    }, (error)=>{
      if(error.status == 422){
        this.errors = {
          productId: '',
          discountPercent: '',
          dateFrom: '',
          dateTo: ''
        };
        error.error.forEach((element: ValidatonError) => {
          switch (element.property){
            case 'ProductId':
              this.errors.productId = element.error;
              break;
            case 'DiscountPercent':
              this.errors.discountPercent = element.error;
              break;
            case 'DateFrom':
              this.errors.dateFrom = element.error;
              break;
            case 'DateTo':
              this.errors.dateTo = element.error;
              break;
          }
        });

      }
    });
  }
  updateDiscount() {
    let dateFromDate = this.discount.dateFrom.split(' ')[0];
    let dateFromTime = this.discount.dateFrom.split(' ')[1];
    let dateToDate = this.discount.dateTo.split(' ')[0];
    let dateToTime = this.discount.dateTo.split(' ')[1];
    this.discount.dateFrom = dateFromDate + 'T' + dateFromTime;
    this.discount.dateTo = dateToDate + 'T' + dateToTime;
    this.http.put(`${this.baseUrl}discounts/${this.id}`, this.discount, {observe: 'response'}).subscribe(
      response=>{
      this.errors = {
        productId: '',
        discountPercent: '',
        dateFrom: '',
        dateTo: ''
      };
      if(response.status == 204){
        Swal.fire("Success", "Discount updated successfully.", "success").then(() => {
          this.router.navigate(['/admin/discounts']);
        });
      }
    }, (error)=>{
      if(error.status == 422){
        this.errors = {
          productId: '',
          discountPercent: '',
          dateFrom: '',
          dateTo: ''
        };
        error.error.forEach((element: ValidatonError) => {
          switch (element.property){
            case 'ProductId':
              this.errors.productId = element.error;
              break;
            case 'DiscountPercent':
              this.errors.discountPercent = element.error;
              break;
            case 'DateFrom':
              this.errors.dateFrom = element.error;
              break;
            case 'DateTo':
              this.errors.dateTo = element.error;
              break;
          }
        });

      }
    });
  }
}
