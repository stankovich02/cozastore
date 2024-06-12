import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../core/models/object-model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IProductService } from '../interfaces/iproduct-service.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceImpl implements IProductService  {
  constructor(private http : HttpClient, private router : Router){
  }
  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>('/assets/data/products.json');
  }
  getLatestProducts(numOfProducts : number) : Observable<Product[]>{
    return this.http.get<Product[]>('/assets/data/products.json').pipe(
      map(products => products.sort((a, b) => b.id - a.id).slice(0, numOfProducts))
    );
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product[]>('/assets/data/products.json').pipe(
      map(products => products.find(product => product.id === id)!)
    );
  }
  getRelatedProducts(category: string,gender : string, id : number): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/data/products.json').pipe(
      map(products => products.filter(product => product.category === category && product.gender === gender && product.id !== id))
    );
  }
  loadProduct(){
    const productId = localStorage.getItem('productId');
    if(productId){
      this.router.navigate(['/products/' + productId]);
    }
  }
}
