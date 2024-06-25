import { Observable } from "rxjs";
import { Product, PagedResponse } from "../../core/models/object-model";
import { InjectionToken } from "@angular/core";

export interface IProductService {
    getProducts(): Observable<PagedResponse<Product>>;
    getLatestProducts(numOfProducts: number): Observable<Product[]>;
    getProduct(id: number): Observable<Product>;
    getRelatedProducts(id : number): Observable<Product[]>;
}
export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('IProductService');
