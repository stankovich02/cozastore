import { Component, OnInit, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductsServiceImpl } from '../../../../../shared/services/products.service.impl';
import { Product, ValidatonError } from '../../../../../core/models/object-model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WishlistServiceImpl } from '../../../../../shared/services/wishlist.service.impl';
import { CartServiceImpl } from '../../../../../shared/services/cart.service.impl';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  private productId: string = '';
  protected quantity: number = 1;
  protected product : Product = {} as Product;
  protected relatedProducts : Product[] = [];
  protected isProductInWishlist: boolean;
  protected reviewText: string = '';
  protected rateError: string = '';
  protected reviewTextError: string = '';
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private productService : ProductsServiceImpl, private route: ActivatedRoute,private router: Router,private wishlistService : WishlistServiceImpl,private cartService : CartServiceImpl,private http: HttpClient) {
   
  }
;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.isProductInWishlist = this.wishlistService.isProductInWishlist(Number(this.productId));

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
    return 'http://localhost:5001/' + imagePath;
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
      this.productService.getRelatedProducts(this.product.id).subscribe((data) => {
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
    if(this.isProductInWishlist){
      this.wishlistService.removeProductFromWishlist(productId,name);
      this.isProductInWishlist = false;
      return;
    }
    this.wishlistService.addProductToWishlist(productId,name);
    this.isProductInWishlist = true;
    
  }
  addProductToCart(productId: number,name: string): void {
    this.cartService.addProductToCart(productId,this.quantity,name);
  }
  submitReview(): void {
    let rate = document.querySelectorAll(".w-full .zmdi-star").length;
    this.http.post('http://localhost:5001/api/reviews', {
      productId: this.product.id,
      rate: rate,
      reviewText: this.reviewText
    },{observe: 'response'}).subscribe(response => {
      if (response.status == 201) {
        this.reviewText = '';
        this.rateError = '';
        this.reviewTextError = '';
        Swal.fire('Congratulations!', 'Your review has been submitted successfully!', 'success').then(() => {
          this.reloadComponent();
        });
      }
    },
    error => {
      if(error.status == 409){
        Swal.fire('Error!', error.error.error , 'error');
      }
      if(error.status == 422){
        console.log(error.error);
        
        this.rateError = '';
        this.reviewTextError = '';
       error.error.forEach((element: ValidatonError) => {
        switch (element.property) {
          case 'Rate':
            this.rateError = element.error;
            break;
          case 'ReviewText':
            this.reviewTextError = element.error;
            break;
        }
       });
      }
    });
  }

}
