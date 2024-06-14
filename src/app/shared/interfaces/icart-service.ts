import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { CartProduct, Product } from "../../core/models/object-model";
export interface ICartService { 
    addProductToCart(productId: number, quantity: number,name:string): void;
    isProductInCart(productId: number): boolean;
    getProductsFromCart(): Observable<CartProduct[]>;
    changeProductQuantity(productId: number, quantity: number): void;
    removeProductFromCart(productId: number,name : string): void;
}
export const WISHLIST_SERVICE_TOKEN = new InjectionToken<ICartService>('ICartService');

