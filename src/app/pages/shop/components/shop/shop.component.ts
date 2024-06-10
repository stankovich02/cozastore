import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../core/models/object-model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  protected products : Product[] = [];

 constructor(private productService : ProductsService){
  
 }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    });
  }
  
}
