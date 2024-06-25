import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PagedResponse } from '../../../../core/models/object-model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent{
  protected table : string = '';
  protected tables: Array<string> = ['products','categories','brands','colors','sizes','users','genders','discounts','orders','prices','auditlogs','errorlogs','reviews'];
  protected tableForCreate : Array<string> = ['products','categories','brands','colors','sizes','users','genders','discounts'];
  protected tableForUpdate : Array<string> = ['products','categories','brands','colors','sizes','users','genders','discounts'];
  protected tableForDelete : Array<string> = ['products','categories','brands','colors','sizes','users','genders','discounts'];

  protected filtersToShow  = {
    searchByName: ['products','categories','brands','colors','sizes','genders'],
    searchByIsActive: ['products','categories','brands','colors','sizes','genders','users'],
  }
  protected filters = {
    searchByName: '',
    searchByIsActive: null,
  }
  protected columnsForSkip : Array<string> = ['reviews','averageRating'];
  protected items : any = [];
  protected columns : any = [];
  protected entitiesLength : number = 0;
  protected pages : number[] = [];
  protected activePage : number = 1;
  private baseUrl : string = 'http://localhost:5001/api/';
  constructor(private router: Router, private http: HttpClient) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let segments = this.router.url.split('/');
      this.table = segments[segments.length - 1];
      if(this.tables.includes(this.table)){
        let params = new HttpParams();
        if(this.table == 'auditlogs' || this.table == 'errorlogs'){
          params = params.append('perPage', '20');
        }
        this.http.get(this.baseUrl + this.table, {params}).subscribe((data : PagedResponse<any>) => {
          this.items = data.data;
          this.entitiesLength = data.totalCount;
          this.pages = [];
          for(let i = 1; i <= data.pages; i++){
            this.pages.push(i);
          }
        
          this.columns = Object.keys(data.data[0]);    
          console.log(this.columns);
           
          this.filters = {
            searchByName: '',
            searchByIsActive: null,
          }
        });
      }
    });
   }
   showStackTrace(error){
      alert(error);
   }
   pagination(page : number){
    this.activePage = page;
    this.filterEntities(true);
  }
  get searchByIsActive(): string {
    switch(this.filters.searchByIsActive){
      case 'true':
        return 'true';
      case 'false':
        return 'false';
      default:
        return 'null';
    }
  }
  
  set searchByIsActive(value: string) {
    switch(value){
      case 'true':
        value = 'true';
        break;
      case 'false':
        value = 'false';
        break;
      default:
        value = null;
        break;
    }
    this.filters.searchByIsActive = value;
    this.filterEntities();
  }
  searchByName(name: string){
    this.filters.searchByName = name;
    this.filterEntities();
  }
  filterEntities(pagination : boolean = false){
    let params = new HttpParams();
    if(!pagination){
      this.activePage = 1;
    }
    else{
      params = params.append('Page', this.activePage.toString());
    }
    if(this.filters.searchByName){
      params = params.append('Name', this.filters.searchByName);
    }
    if(this.filters.searchByIsActive){
      params = params.append('IsActive', this.filters.searchByIsActive);
    }
    if(this.table == 'auditlogs' || this.table == 'errorlogs'){
      params = params.append('perPage', '20');
    }
    this.http.get('http://localhost:5001/api/'+this.table, { params }).subscribe((data : PagedResponse<any>) => {
      this.items = data.data;
      this.entitiesLength = data.totalCount;
      this.pages = [];
      for(let i = 1; i <= data.pages; i++){
        this.pages.push(i);
      }       
    });
    
  }
  deleteEntity(id : any){
    Swal.fire({
      title: 'Do you want to delete a row with id ' + id + '?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<HttpResponse<any>>(`${this.baseUrl}${this.table}/${id}`, {observe: 'response'}).subscribe(
          response => {
            if(response.status === 204){
              Swal.fire('Success', 'Entity deleted.', 'success');
              this.filterEntities();
            }
          },
          error => {
            if(error.status == 404){
              Swal.fire('Error', 'Entity not found', 'error');
            }
            if(error.status == 409){
              Swal.fire('Error', error.error.error, 'error');
            }
            if(error.status == 500){
              this.showStackTrace(error);
            }
          }
        );
      } else if (result.isDenied) {
        
      }
    })
   
  }
  activateEntity(id : any){
    Swal.fire({
      title: 'Do you want to activate a row with id ' + id + '?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.patch<HttpResponse<any>>(`${this.baseUrl}${this.table}/${id}/activate`, {},{observe: 'response'}).subscribe(
          response => {
            console.log(response);
            
            if (response.status === 204) {
              Swal.fire('Success', 'Entity activated.', 'success');
              this.filterEntities();
            }
          },
          error => {
            if (error.status === 404) {
              Swal.fire('Error', 'Entity not found', 'error');
            } else if (error.status === 409) {
              Swal.fire('Error', error.error.error, 'error');
            } else if (error.status === 500) {
              this.showStackTrace(error);
            }
          }
        );
      } else if (result.isDenied) {
        
      }
    })
   
  }
  navigateToCreate(){
    this.router.navigate([this.router.url + '/create']);
  }
  navigateToUpdate(id : number){
    this.router.navigate([`${this.router.url}/${id}/update`]);
  }
}
