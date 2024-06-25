import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NamedEntity } from '../../../../core/models/object-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-named-entity',
  templateUrl: './named-entity.component.html',
  styleUrl: './named-entity.component.css'
})
export class NamedEntityComponent {
  constructor(private http: HttpClient,protected router: Router,private route: ActivatedRoute){}
  private baseUrl = 'http://localhost:5001/api/';
  protected table : string = '';
  protected name: string = '';

  ngOnInit(): void {
    this.table = this.router.url.split('/')[2];
    console.log(this.table);
    
    if(this.router.url.includes('update')){
      let id = this.route.snapshot.paramMap.get('id');
      
      this.http.get<NamedEntity>(`${this.baseUrl}${this.table}/${id}`,{observe: 'response'}).subscribe(
        response=>{
          this.name = response.body.name;
        },
        error=>{
          if(error.status === 404){
            Swal.fire("Error", "Entity not found", "error");
          }
        });
      }
    }
  protected nameError = '';
  addProduct(){    
    this.http.post(`${this.baseUrl}${this.table}`, {name: this.name}, {observe: 'response'}).subscribe(
      response=>{
      this.nameError = '';
      this.name = '';
      if(response.status == 201){
        Swal.fire("Success", "Entity added successfully.", "success").then(() => {
          this.router.navigate(['/admin/'+this.table]);
        });
      }
    }, (error)=>{
      if(error.status == 422){
        this.nameError = '';
        this.nameError = error.error[0].error;

      }
    });
  }
  updateProduct(){
    let id = this.route.snapshot.paramMap.get('id');
    this.http.put(`${this.baseUrl}${this.table}/${id}`,{name: this.name}, {observe: 'response'}).subscribe(
      response=>{
      this.nameError = '';
      if(response.status == 204){
        Swal.fire("Success", "Entity updated successfully.", "success").then(() => {
          this.router.navigate(['/admin/' + this.table]);
        });
      }
    }, (error)=>{
      if(error.status == 422){
        this.nameError = '';
        this.nameError = error.error[0].error;
      }
    });
  }
}
