import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  protected product : Product = {} as Product;
  protected relatedProducts : Product[] = [];
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private productService : ProductsService, private route: ActivatedRoute,private router: Router) {
   
  };
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadProductsAndRelatedProducts();
      this.loadScripts();
    });
   
    this.loadProductsAndRelatedProducts();
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
  loadProductsAndRelatedProducts() {
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

}
