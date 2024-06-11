import { Component, OnInit, Renderer2, Inject, AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../core/models/object-model';
import imagesLoaded from 'imagesloaded';
declare var Isotope: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  protected latestProducts : Product[] = [];
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private productService : ProductsService,private cdr: ChangeDetectorRef) {}
 ngOnInit(): void {
  this.loadScripts();
  this.loadLatestProducts();
 }
  loadLatestProducts(){
    this.productService.getLatestProducts(4).subscribe((data)=>{
      this.latestProducts = data;
    });
  }
  loadScripts() {
    let script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.className = 'myScripts';
    script.src = 'assets/vendor/slick/slick.min.js';
    this.renderer.appendChild(this.document.body, script);
 
  setTimeout(() => {
    let script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.className = 'myScripts';
    script2.src = 'assets/js/slick-custom.js';
    this.renderer.appendChild(this.document.body, script2);
  }, 0);
  }
}
