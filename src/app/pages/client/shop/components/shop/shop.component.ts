import { Component, OnInit, Inject,Output, EventEmitter} from '@angular/core';
import { NamedEntity, NamedEntityAPI, Product, ProductAPI } from '../../../../../core/models/object-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductsServiceImpl } from '../../../../../shared/services/products.service.impl';
import { IProductService, PRODUCT_SERVICE_TOKEN } from '../../../../../shared/interfaces/iproduct-service.inteface';




@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  providers: [{provide: PRODUCT_SERVICE_TOKEN, useClass: ProductsServiceImpl}]
})
export class ShopComponent implements OnInit{
  protected products : Product[] = [];
  protected colors : NamedEntity[];
  protected sizes : NamedEntity[];
  protected brands : NamedEntity[];
  protected categories : NamedEntity[];
  protected filters = {
    colors : [],
    sizes : [],
    brands : [],
    category : 0,
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

  };
  private static readonly perPage = 8;
  protected minProductIndex : number = 1;
  protected maxProductIndex : number = 0;
  protected productsLength : number = 0;
  protected pages : number[] = [];
  protected activePage : number = 1;
  private baseUrl = 'http://localhost:5001/api/';

 constructor(@Inject(PRODUCT_SERVICE_TOKEN) private productService: IProductService,  private http : HttpClient){
  
 }
  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();
  }
  loadProducts(){
    this.productService.getProducts().subscribe((response)=>{
      this.products = response.data;
      this.maxProductIndex = this.products.slice((this.activePage-1)*ShopComponent.perPage,this.activePage*ShopComponent.perPage).length;
      this.productsLength = response.totalCount;
      for(let i = 1; i <= response.pages; i++){
        this.pages.push(i);
      }
    });
  }
  loadFilters(){
    this.http.get<NamedEntityAPI>(`${this.baseUrl}colors?perPage=20`).subscribe((response)=>{
      this.colors = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}sizes?perPage=20`).subscribe((response)=>{
      this.sizes = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}brands?perPage=20`).subscribe((response)=>{
      this.brands = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}categories?perPage=20`).subscribe((response)=>{
      this.categories = response.data;
    });
  }
  filterByName(keyword : string){
    this.filters.keyword = keyword;
    this.filterProducts();
  }
  filterByColor(colorID : number, index : number){
    if(this.filters.colors.includes(colorID)){ 
      this.selectedIndexes.colors = this.selectedIndexes.colors.filter((item)=> item !== index);
      this.filters.colors = this.filters.colors.filter((item)=> item !== colorID);
    }else{
      this.selectedIndexes.colors.push(index);
      this.filters.colors.push(colorID);
    }    
    this.filterProducts();
  }
  filterBySize(sizeID : number, index : number){
    if(this.filters.sizes.includes(sizeID)){
      this.selectedIndexes.sizes = this.selectedIndexes.sizes.filter((item)=> item !== index);
      this.filters.sizes = this.filters.sizes.filter((item)=> item !== sizeID);
    }else{
      this.selectedIndexes.sizes.push(index);
      this.filters.sizes.push(sizeID);
    }
    this.filterProducts();
  }
  filterByBrand(brandID : number, index : number){
    if(this.filters.brands.includes(brandID)){
      this.selectedIndexes.brands = this.selectedIndexes.brands.filter((item)=> item !== index);
      this.filters.brands = this.filters.brands.filter((item)=> item !== brandID);
    }else{
      this.selectedIndexes.brands.push(index);
      this.filters.brands.push(brandID);
    }
    this.filterProducts();
  }
  filterByCategory(categoryID : number, index : number){
    if(this.selectedIndexes.category === index){
      this.selectedIndexes.category = -1;
      this.filters.category = 0;
      this.filterProducts();
      return;
    }
    this.selectedIndexes.category = index;
    this.filters.category = categoryID;
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
    let params = new HttpParams();

    params = params.append('IsActive', "true");
    if(!paginationClicked){
      this.activePage = 1;
    }
    else{
      params = params.append('Page', this.activePage.toString());
    }
    if(this.filters.keyword){
      params = params.append('Keyword', this.filters.keyword);
    }
    if(this.filters.colors.length > 0){
      this.filters.colors.forEach(id => {
        params = params.append('ColorIds', id.toString());
      });
    }
    if(this.filters.sizes.length > 0){
      this.filters.sizes.forEach(id => {
        params = params.append('SizeIds', id.toString());
      });
    }
    if(this.filters.brands.length > 0){
      this.filters.brands.forEach(id => {
        params = params.append('BrandIds', id.toString());
      });
    }
    if(this.filters.category){
      params = params.append('CategoryId', this.filters.category.toString());
    }
    if(this.filters.price.min > 0){
      params = params.append('MinPrice', this.filters.price.min.toString());
    }
    if(this.filters.price.max < 1000){
      params = params.append('MaxPrice', this.filters.price.max.toString());
    }
    if(this.filters.sortBy){
      if(this.filters.sortBy === "price-asc"){
        params = params.append('Sort', 'price-asc');
       }else if(this.filters.sortBy === "price-desc"){
        params = params.append('Sort', 'price-desc');
       }else if(this.filters.sortBy === "latest"){
        params = params.append('Sort', 'latest');
       }else if(this.filters.sortBy === "rating"){
        params = params.append('Sort', 'rating');
       }
    }
    this.http.get<ProductAPI>('http://localhost:5001/api/products', { params }).subscribe((response)=>{
      this.products = response.data;
      this.productsLength = response.totalCount;
      this.minProductIndex = (this.activePage-1)*ShopComponent.perPage + 1;
      this.maxProductIndex = response.data.length + this.minProductIndex - 1;
      this.pages = [];
      for(let i = 1; i <= response.pages; i++){
        this.pages.push(i);
      }
    });
  } 
}


