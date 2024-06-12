import { Observable } from "rxjs";
import { Product } from "../../core/models/object-model";
import { InjectionToken } from "@angular/core";

export interface IProductService {
    getProducts(): Observable<Product[]>;
    getLatestProducts(numOfProducts: number): Observable<Product[]>;
    getProduct(id: number): Observable<Product>;
    getRelatedProducts(category: string,gender : string, id : number): Observable<Product[]>;
}
export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('IProductService');
