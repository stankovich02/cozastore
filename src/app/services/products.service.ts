import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http : HttpClient){
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
}
