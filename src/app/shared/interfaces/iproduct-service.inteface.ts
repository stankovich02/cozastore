import { Observable } from "rxjs";
import { Product, ProductAPI } from "../../core/models/object-model";
import { InjectionToken } from "@angular/core";

export interface IProductService {
    getProducts(): Observable<ProductAPI>;
    getLatestProducts(numOfProducts: number): Observable<Product[]>;
    getProduct(id: number): Observable<Product>;
    getRelatedProducts(id : number): Observable<Product[]>;
}
export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('IProductService');
