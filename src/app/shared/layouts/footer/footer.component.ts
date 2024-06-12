import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor( private http: HttpClient, protected router: Router, private navigationService : NavigationService) {
  }
  protected nav: any;
  protected email: string = '';
  protected error: string = '';
  protected validForm: boolean = false;
  ngOnInit(): void {
     this.getNav();
   }
 
 
   getNav() {
    this.navigationService.getNavigation().subscribe((data)=>{
      this.nav = data;
    });
  }
  submitNewsletter() {
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (this.email == '') {
      this.error = 'Email is required.';
    }
    else if (emailRegex.test(this.email) == false) {
      this.error = 'Invalid email. Example: jhondoe@gmail.com';
    }
    else {
      this.error = '';
    }

    if (this.error == '') {
      this.validForm = true;
      this.email = '';
      setTimeout(() => {
        this.validForm = false;
      }, 2000);
    }
    else {
      this.validForm = false;
    }
  }
}
