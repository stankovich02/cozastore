import { Component, OnInit, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductsServiceImpl } from '../../../../shared/services/products.service.impl';
import { Product } from '../../../../core/models/object-model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WishlistServiceImpl } from '../../../../shared/services/wishlist.service.impl';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  private productId: string = '';
  protected product : Product = {} as Product;
  protected relatedProducts : Product[] = [];
  protected isProductInWishlist: boolean;
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private productService : ProductsServiceImpl, private route: ActivatedRoute,private router: Router,private wishlistService : WishlistServiceImpl) {
   
  }
;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.isProductInWishlist = this.wishlistService.isProductInWishlist(parseInt(this.productId));
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        this.loadProductAndRelatedProducts();
        this.loadScripts();
        location.reload();
    });
   
    this.loadProductAndRelatedProducts();
    this.loadScripts();
  }
  getProductImagePath(imagePath: string) {
    return '/assets/images/products/' + imagePath + '.jpg';
  }
  getProductRating(rating: number) {
    let html = '';
    for (let i = 0; i < rating; i++) {
      html += '<i class="zmdi zmdi-star"></i>';
    }
    for (let i = rating; i < 5; i++) {
      html += '<i class="zmdi zmdi-star-outline"></i>';
    }
    return html;
  }
  loadProductAndRelatedProducts() {
    this.productService.getProduct(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe((product: Product) => {
      this.product = product;

      this.loadRelatedProducts();
    });
  }
  loadRelatedProducts() {
    if (this.product) {
      this.productService.getRelatedProducts(this.product.category, this.product.gender, this.product.id).subscribe((data) => {
        this.relatedProducts = data;
      });
    }
  }
  loadScripts(): void {
    this.removeExistingScripts();
    setTimeout(() => {
      this.loadScript('/assets/vendor/slick/slick.min.js');
    }, 50);
    setTimeout(() => {
      this.loadScript('/assets/js/slick-custom.js');
    
    }, 200);
  }
  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.className = 'myScripts';
    script.src = src;
    this.renderer.appendChild(this.document.body, script);
  }
  removeExistingScripts(): void {
    const existingScripts = this.document.querySelectorAll('.myScripts');
    existingScripts.forEach(script => {
      this.renderer.removeChild(this.document.body, script);
    });
  }
  reloadComponent() {
    this.router.navigateByUrl('/products/' + this.productId, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/' + this.productId]);
    });
  }
  addProductTowishlist(productId: number,name : string): void {
    this.wishlistService.addProductToWishlist(productId,name);
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.isProductInWishlist = this.wishlistService.isProductInWishlist(parseInt(this.productId));
    this.wishlistService.updateNumberOfProductsInWishlist(wishlist.length);
  }

}
