import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../core/models/object-model";
export interface ICartService { 
    addProductToCart(productId: number, quantity: number,name:string): void;
    isProductInCart(productId: number): boolean;
    getProductsFromCart(): Product[];
}
export const WISHLIST_SERVICE_TOKEN = new InjectionToken<ICartService>('ICartService');

