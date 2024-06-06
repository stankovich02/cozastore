import { Component, OnInit, Renderer2, Inject, AfterViewInit, AfterContentInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}
 ngOnInit(): void {
  let script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.className = 'myScripts';
    script.src = 'assets/vendor/slick/slick.min.js';
    this.renderer.appendChild(this.document.body, script);
 
  setTimeout(() => {
    let script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.className = 'myScripts';
    script2.src = 'assets/js/slick-custom.js';
    this.renderer.appendChild(this.document.body, script2);
  }, 300);

 }
}
