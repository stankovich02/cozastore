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
  protected products : Product[] = [];
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
    },
    sortBy : ""
  };
  protected selectedIndexes = {
    colors : [],
    sizes : [],
    brands : [],
    category : -1,
    price : 0,

  }
  protected minProductIndex : number = 1;
  protected maxProductIndex : number = 0;
  protected productsLength : number = 0;
  protected pages : number[] = [];
  protected activePage : number = 1;
  private baseUrl = 'http://localhost:4200/assets/data/';

 constructor(private productService : ProductsService,private http : HttpClient){
  
 }
  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();
  }

  loadProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
      this.maxProductIndex = this.products.slice((this.activePage-1)*8,this.activePage*8).length;
      this.productsLength = this.products.length;
      this.originalProducts = data;
      for(let i = 1; i <= Math.ceil(this.products.length/8); i++){
        this.pages.push(i);
      }
      this.products = this.products.slice(0,8);
    });
  }
  loadFilters(){
    this.http.get<NamedEntity[]>(`${this.baseUrl}colors.json`).subscribe((data)=>{
      this.colors = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}sizes.json`).subscribe((data)=>{
      this.sizes = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}brands.json`).subscribe((data)=>{
      this.brands = data;
    });
    this.http.get<NamedEntity[]>(`${this.baseUrl}categories.json`).subscribe((data)=>{
      this.categories = data;
    });
  }
  filterByName(keyword : string){
    this.filters.keyword = keyword;
    this.filterProducts();
  }
  filterByColor(color : string, index : number){
    if(this.filters.colors.includes(color)){ 
      this.selectedIndexes.colors = this.selectedIndexes.colors.filter((item)=> item !== index);
      this.filters.colors = this.filters.colors.filter((item)=> item !== color);
    }else{
      this.selectedIndexes.colors.push(index);
      this.filters.colors.push(color);
    }
    console.log(this.filters.colors);
    
    this.filterProducts();
  }
  filterBySize(size : string, index : number){
    if(this.filters.sizes.includes(size)){
      this.selectedIndexes.sizes = this.selectedIndexes.sizes.filter((item)=> item !== index);
      this.filters.sizes = this.filters.sizes.filter((item)=> item !== size);
    }else{
      this.selectedIndexes.sizes.push(index);
      this.filters.sizes.push(size);
    }
    this.filterProducts();
  }
  filterByBrand(brand : string, index : number){
    if(this.filters.brands.includes(brand)){
      this.selectedIndexes.brands = this.selectedIndexes.brands.filter((item)=> item !== index);
      this.filters.brands = this.filters.brands.filter((item)=> item !== brand);
    }else{
      this.selectedIndexes.brands.push(index);
      this.filters.brands.push(brand);
    }
    this.filterProducts();
  }
  filterByCategory(category : string, index : number){
    if(this.selectedIndexes.category === index){
      this.selectedIndexes.category = -1;
      this.filters.category = "";
      this.filterProducts();
      return;
    }
    this.selectedIndexes.category = index;
    this.filters.category = category;
    this.filterProducts();
  }
  pagination(page : number){
    this.activePage = page;
    this.filterProducts(true);
  }
  filterByPrice(index : number, min : number, max? : number){
    if(this.selectedIndexes.price === index){
      this.selectedIndexes.price = 0;
      this.filters.price.min = 0;
      this.filters.price.max = 1000;
      this.filterProducts();
      return;
    }
    this.selectedIndexes.price = index;
    this.filters.price.min = min;
    this.filters.price.max = max || 1000;
    this.filterProducts();
  }
  sortProducts(sortBy : string){
    this.filters.sortBy = sortBy;
    this.filterProducts();
  }
  filterProducts(paginationClicked? : boolean){
    if(!paginationClicked){
      this.activePage = 1;
    }
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
    this.products = this.products.sort((a,b)=>{
      if(this.filters.sortBy === "price-asc"){
        return a.price.activePrice - b.price.activePrice;
      }else if(this.filters.sortBy === "price-desc"){
        return b.price.activePrice - a.price.activePrice;
      }else if(this.filters.sortBy === "latest"){
        return b.id - a.id;
      }else if(this.filters.sortBy === "rating"){
        return b.averageRating - a.averageRating;
      }
      return 0;
    });
    this.productsLength = this.products.length;
    this.minProductIndex = (this.activePage-1)*8 + 1;
    this.maxProductIndex = this.products.slice((this.activePage-1)*8,this.activePage*8).length + (this.activePage-1)*8;
    this.pages = [];
    for(let i = 1; i <= Math.ceil(this.products.length/8); i++){
      this.pages.push(i);
    }
    this.products = this.products.slice((this.activePage-1)*8,this.activePage*8);
  } 
}
