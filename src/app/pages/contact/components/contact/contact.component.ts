import { Component} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent{
  protected email: string = '';
  protected message: string = '';
  protected emailError: string = '';
  protected messageError: string = '';
  protected validForm: boolean = false;

  submitForm(){
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(this.email == ''){
      this.emailError = 'Email is required.';
    }
    else if(emailRegex.test(this.email) == false){
      this.emailError = 'Invalid email. Example: jhondoe@gmail.com';
    }
    else{
      this.emailError = '';
    }
    if(this.message == ''){
      this.messageError = 'Message is required.';
    }
    else if(this.message.length < 10){
      this.messageError = 'Message must be at least 10 characters.';
    }
    else{
      this.messageError = '';
    }


    if(this.emailError == '' && this.messageError == ''){
      this.validForm = true;
      this.email = '';
      this.message = '';
      setTimeout(() => {
        this.validForm = false;
      }, 2000);
    }
    else{
      this.validForm = false;
    }
  }
}
