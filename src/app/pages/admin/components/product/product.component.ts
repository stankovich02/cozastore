import { Component, OnInit } from '@angular/core';
import { NamedEntity, NamedEntityAPI, Product, UploadImageAPI } from '../../../../core/models/object-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(private http: HttpClient,protected router: Router,private route: ActivatedRoute){}
  private baseUrl = 'http://localhost:5001/api/';
  ngOnInit(): void {
    this.http.get<NamedEntityAPI>(`${this.baseUrl}colors?perPage=20&isActive=True`).subscribe((response)=>{
      this.colors = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}sizes?perPage=20&isActive=True`).subscribe((response)=>{
      this.sizes = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}brands?perPage=20&isActive=True`).subscribe((response)=>{
      this.brands = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}genders?perPage=20&isActive=True`).subscribe((response)=>{
      this.genders = response.data;
    });
    this.http.get<NamedEntityAPI>(`${this.baseUrl}categories?perPage=20&isActive=True`).subscribe((response)=>{
      this.categories = response.data;
    });
    if(this.router.url.includes('update')){
      let id = this.route.snapshot.paramMap.get('id');
      
      this.http.get<Product>(`${this.baseUrl}products/${id}`,{observe: 'response'}).subscribe(
        response=>{
          let categoryID = this.categories.filter((category)=>category.name === response.body.category)[0].id.toString();
          let brandID = this.brands.filter((brand)=>brand.name === response.body.brand)[0].id.toString();
          let genderID = this.genders.filter((gender) =>gender.name === response.body.gender)[0].id.toString();
          let sizeIDs = this.sizes.filter((size)=>response.body.sizes.includes(size.name)).map((size)=>size.id);
          let colorIDs = this.colors.filter((color)=>response.body.colors.includes(color.name)).map((color)=>color.id);
          this.product = {
            name: response.body.name,
            description : response.body.description,
            categoryId : categoryID,
            brandId : brandID,
            genderId : genderID,
            price: response.body.price.oldPrice == null ? response.body.price.activePrice : response.body.price.oldPrice,
            images: response.body.images,
            sizes : sizeIDs,
            colors : colorIDs,
          }
          
        },
        error=>{
          if(error.status === 404){
            Swal.fire("Error", "Product not found", "error");
          }
        });
      }
    }
  protected product = {
    name: '',
    description : '',
    categoryId : '0',
    brandId : '0',
    genderId : '0',
    price: 0,
    images: [],
    sizes : [0],
    colors : [0],
  }
  protected errors = {
    productName: '',
    description : '',
    categoryId : '',
    brandId : '',
    genderId : '',
    available : '',
    price: '',
    images: '',
    sizes : '',
    colors : '',
  }
  protected categories : NamedEntity[] = [];
  protected brands : NamedEntity[] = [];
  protected colors : NamedEntity[] = [];
  protected sizes : NamedEntity[] = [];
  protected genders: NamedEntity[] = [];

  addProduct(){    
    this.http.post(`${this.baseUrl}products`, this.product).subscribe((response)=>{
      this.errors = {
        productName: '',
        description : '',
        categoryId : '',
        brandId : '',
        genderId : '',
        available : '',
        price: '',
        images: '',
        sizes : '',
        colors : '',

      }
      this.product = {
        name: '',
        description : '',
        categoryId : '0',
        brandId : '0',
        genderId : '0',
        price: 0,
        images: [],
        sizes : [0],
        colors : [0],
      };
      Swal.fire("Success", "Product updated successfully.", "success").then(() => {
        this.router.navigate(['/admin/products']);
      });
    }, (error)=>{
      if(error.status == 422){
        this.errors = {
          productName: '',
          description : '',
          categoryId : '',
          brandId : '',
          genderId : '',
          available : '',
          price: '',
          images: '',
          sizes : '',
          colors : '',
          
        }
        error.error.forEach((element) => {
           if(element.property === 'Name') {
            this.errors.productName = element.error;
            }
            if(element.property === 'Description') {
              this.errors.description = element.error;
            }
            if(element.property === 'CategoryId') {
              this.errors.categoryId = element.error;
            }
            if(element.property === 'BrandId') {
              this.errors.brandId = element.error;
            }
            if(element.property === 'GenderId') {
              this.errors.genderId = element.error;
            }
            if(element.property === 'Available') {
              this.errors.available = element.error;
            }
            if(element.property === 'Price') {
              this.errors.price = element.error;
            }
            if(element.property === 'Images') {
              this.errors.images = element.error;
            }
            if(element.property.includes('Colors')) {
              this.errors.sizes = element.error;
            }
            if(element.property.includes('Sizes')) {
              this.errors.colors = element.error;
            }
        });
      }
    });
  }
  uploadImage(image: File): void {
    const formData: FormData = new FormData();
    formData.append('file', image);
  
    this.http.post<UploadImageAPI>(`${this.baseUrl}images`, formData, { observe: 'response' }).subscribe(
      response => {
        if(response.status === 201) {
          this.product.images.push(response.body.file);
        }
      }, 
      error => {
        if (error.status === 400) {
          this.errors = error.error.errors;
        }
        if (error.status === 422) {
          Swal.fire("Error", error.error[0].error, "error");
        }
      }
    );
  }
  updateProduct(){
    let id = this.route.snapshot.paramMap.get('id');
    let tempArray = [];
    this.product.images.forEach((image, index) => {
      if(image.includes('images/products')){
        tempArray.push(image.split('/')[3]);
      }
      else{
        tempArray.push(image);
      }
    });
    this.product.images = tempArray;
    this.http.put(`${this.baseUrl}products/${id}`, this.product, {observe: 'response'}).subscribe(
      response=>{
      this.errors = {
        productName: '',
        description : '',
        categoryId : '',
        brandId : '',
        genderId : '',
        available : '',
        price: '',
        images: '',
        sizes : '',
        colors : '',

      }
      if(response.status == 204){
        let tempArray = [];
        this.product.images.forEach((image, index) => {
          tempArray.push('/images/products/'+image);
        });
        this.product.images = tempArray;
        Swal.fire("Success", "Product updated successfully.", "success").then(() => {
          this.router.navigate(['/admin/products']);
        });
      }
    }, (error)=>{
      if(error.status == 422){
        this.errors = {
          productName: '',
          description : '',
          categoryId : '',
          brandId : '',
          genderId : '',
          available : '',
          price: '',
          images: '',
          sizes : '',
          colors : '',
          
        }
        error.error.forEach((element) => {
           if(element.property === 'Name') {
            this.errors.productName = element.error;
            }
            if(element.property === 'Description') {
              this.errors.description = element.error;
            }
            if(element.property === 'CategoryId') {
              this.errors.categoryId = element.error;
            }
            if(element.property === 'BrandId') {
              this.errors.brandId = element.error;
            }
            if(element.property === 'GenderId') {
              this.errors.genderId = element.error;
            }
            if(element.property === 'Available') {
              this.errors.available = element.error;
            }
            if(element.property === 'Price') {
              this.errors.price = element.error;
            }
            if(element.property === 'Images') {
              this.errors.images = element.error;
            }
            if(element.property.includes('Colors')) {
              this.errors.sizes = element.error;
            }
            if(element.property.includes('Sizes')) {
              this.errors.colors = element.error;
            }
        });
      }
    });
  }
}
