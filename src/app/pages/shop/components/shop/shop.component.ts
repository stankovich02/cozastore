import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../../../shared/services/products.service';
import { NamedEntity, Product } from '../../../../core/models/object-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  protected products : Product[];
  protected originalProducts : Product[];
  protected colors : NamedEntity[];
  protected sizes : NamedEntity[];
  protected brands : NamedEntity[];
  protected categories : NamedEntity[];
  protected filters = {
    colors : [],
    sizes : [],
    brands : [],
    category : "",
    keyword : "",
    price: {
      min : 0,
      max : 1000
    }
  };
  protected selectedCategoryIndex : number = -1;
  protected selectedBrandIndexes : number[] = [];
  protected selectedSizeIndexes : number[] = [];
  protected selectedColorIndexes : number[] = [];
  protected selectedPriceIndex : number = 0;
  private baseUrl = 'http://localhost:4200/assets/data';

 constructor(private productService : ProductsService,private http : HttpClient){
  
 }
  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();
  }

  loadProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
      this.originalProducts = data;
    });
  }
  loadFilters(){
    this.http.get<NamedEntity[]>(`${this.baseUrl}/colors.json`).subscribe((data)=>{
      this.colors = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}/sizes.json`).subscribe((data)=>{
      this.sizes = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}/brands.json`).subscribe((data)=>{
      this.brands = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}/categories.json`).subscribe((data)=>{
      this.categories = data;
    });
  }
  filterByName(keyword : string){
    this.filters.keyword = keyword;
    this.filterProducts();
  }
  filterByColor(color : string, index : number){
    if(this.filters.colors.includes(color)){ 
      this.selectedColorIndexes = this.selectedColorIndexes.filter((item)=> item !== index);
      this.filters.colors = this.filters.colors.filter((item)=> item !== color);
    }else{
      this.selectedColorIndexes.push(index);
      this.filters.colors.push(color);
    }
    console.log(this.filters.colors);
    
    this.filterProducts();
  }
  filterBySize(size : string, index : number){
    if(this.filters.sizes.includes(size)){
      this.selectedSizeIndexes = this.selectedSizeIndexes.filter((item)=> item !== index);
      this.filters.sizes = this.filters.sizes.filter((item)=> item !== size);
    }else{
      this.selectedSizeIndexes.push(index);
      this.filters.sizes.push(size);
    }
    this.filterProducts();
  }
  filterByBrand(brand : string, index : number){
    if(this.filters.brands.includes(brand)){
      this.selectedBrandIndexes = this.selectedBrandIndexes.filter((item)=> item !== index);
      this.filters.brands = this.filters.brands.filter((item)=> item !== brand);
    }else{
      this.selectedBrandIndexes.push(index);
      this.filters.brands.push(brand);
    }
    this.filterProducts();
  }
  filterByCategory(category : string, index : number){
    if(this.selectedCategoryIndex === index){
      this.selectedCategoryIndex = -1;
      this.filters.category = "";
      this.filterProducts();
      return;
    }
    this.selectedCategoryIndex = index;
    this.filters.category = category;
    this.filterProducts();
  }
  filterByPrice(index : number, min : number, max? : number){
    this.selectedPriceIndex = index;
    this.filters.price.min = min;
    this.filters.price.max = max || 1000;
    this.filterProducts();
  }
  filterProducts(){
    this.products = this.originalProducts.filter((product)=>{
      return product.name.toLowerCase().includes(this.filters.keyword.toLowerCase());
    });
    if(this.filters.colors.length > 0){
      let tempArray = [];
      for(let color of this.filters.colors){
       for(let product of this.products){
         if(product.colors.includes(color)){
           tempArray.push(product);
         }
       }
      }
      this.products = tempArray;
    }
    if(this.filters.sizes.length > 0){
      let tempArray = [];
      for(let size of this.filters.sizes){
       for(let product of this.products){
         if(product.sizes.includes(size)){
           tempArray.push(product);
         }
       }
      }
      this.products = tempArray;
    }
    if(this.filters.brands.length > 0){
      this.products = this.products.filter((product)=>{
        return this.filters.brands.includes(product.brand);
      });
    }
    if(this.filters.category){
      this.products = this.products.filter((product)=>{
        return this.filters.category === product.category;
      });
    }
    if(this.filters.price.min > 0 || this.filters.price.max < 1000){
      this.products = this.products.filter((product)=>{
        return product.price.activePrice >= this.filters.price.min && product.price.activePrice < this.filters.price.max;
      });
    }
  }
  
}
