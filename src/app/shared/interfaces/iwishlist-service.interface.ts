import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../core/models/object-model";

export interface IWishlistService {
    addProductToWishlist(productId: number,name: string): void;
    removeProductFromWishlist(productId: number,name: string): void;
    isProductInWishlist(productId: number): boolean;
    getProductsFromWishlist(): Observable<Product[]>;
}
export const WISHLIST_SERVICE_TOKEN = new InjectionToken<IWishlistService>('IWishlistService');
