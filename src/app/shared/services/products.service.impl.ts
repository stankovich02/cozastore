import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, PagedResponse } from '../../core/models/object-model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IProductService } from '../interfaces/iproduct-service.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceImpl implements IProductService  {
  private baseUrl : string = 'http://localhost:5001/api/products';
  constructor(private http : HttpClient, private router : Router){
  }
  getProducts() : Observable<PagedResponse<Product>>{
    return this.http.get<PagedResponse<Product>>(`${this.baseUrl}?isActive=true`);
  }
  getLatestProducts(numOfProducts : number) : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/latest?limit=${numOfProducts}`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  getRelatedProducts(id : number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${id}/related`);
  }
  loadProduct(){
    const productId = localStorage.getItem('productId');
    if(productId){
      this.router.navigate(['/products/' + productId]);
    }
  }
}
