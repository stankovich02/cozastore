import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent{
  constructor(private http: HttpClient){
  }
  protected email: string = '';
  protected fullName: string = '';
  protected subject: string = '';
  protected message: string = '';
  protected emailError: string = '';
  protected messageError: string = '';
  protected fullNameError: string = '';
  protected subjectError: string = '';
  protected validForm: boolean = false;

  submitForm(){
    this.http.post<HttpResponse<any>>('http://localhost:5001/api/messages', 
      {
        email: this.email,
        fullName: this.fullName,
        subject: this.subject,
        messageText: this.message
      }, 
      { observe: 'response' }
    ).subscribe(
      response => {
        if (response.status === 201) {
          this.validForm = true;
          this.email = "";
          this.message = "";
          this.fullName = "";
          this.subject = "";
          this.emailError = "";
          this.fullNameError = "";
          this.subjectError = "";
          this.messageError = "";
          setTimeout(() => {
            this.validForm = false;
          }, 2000);
        }
      },
      error => {
        if (error.status === 422) {
          this.emailError = "";
          this.fullNameError = "";
          this.subjectError = "";
          this.messageError = "";
          error.error.forEach(element => {
            switch (element.property) {
              case 'Email':
                this.emailError = element.error;
                break;
              case 'FullName':
                this.fullNameError = element.error;
                break;
              case 'Subject':
                this.subjectError = element.error;
                break;
              case 'MessageText':
                this.messageError = element.error;
                break;
            }
          });
        }
        this.validForm = false;
      }
    );
    
  }
}
