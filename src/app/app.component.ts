import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private http: HttpClient, protected router: Router) {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.loadScripts();
    });
  }

  ngOnInit() {

  }
  
  loadScripts() {
      const existingScripts = document.querySelectorAll('.myScripts');
      existingScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      let script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.className = 'myScripts';
      script.src = '/assets/vendor/jquery/jquery-3.2.1.min.js';
      this.renderer.appendChild(this.document.body, script);

      let script2 = this.renderer.createElement('script');
      script2.type = 'text/javascript';
      script2.className = 'myScripts';
      script2.src = '/assets/vendor/bootstrap/js/popper.js';
      this.renderer.appendChild(this.document.body, script2);

      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/animsition/js/animsition.min.js';
        this.renderer.appendChild(this.document.body, script);
        }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/bootstrap/js/bootstrap.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/select2/select2.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/daterangepicker/moment.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/daterangepicker/daterangepicker.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/parallax100/parallax100.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/MagnificPopup/jquery.magnific-popup.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script= this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/isotope/isotope.pkgd.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/sweetalert/sweetalert.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.src = '/assets/js/main.js';
        this.renderer.appendChild(this.document.body, script);
      }, 150);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.innerHTML = `$(".js-select2").each(function(){
          $(this).select2({
            minimumResultsForSearch: 20,
            dropdownParent: $(this).next('.dropDownSelect2')
          });
        })`;
        this.renderer.appendChild(this.document.body, script);
      }, 500);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.innerHTML = `$('.gallery-lb').each(function() { // the containers for all your galleries
          $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                  enabled:true
                },
                mainClass: 'mfp-fade'
            });
        });`;
        this.renderer.appendChild(this.document.body, script);
      }, 500);
      setTimeout(() => {
        let script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.className = 'myScripts';
        script.innerHTML = `$('.js-pscroll').each(function(){
          $(this).css('position','relative');
          $(this).css('overflow','hidden');
          var ps = new PerfectScrollbar(this, {
            wheelSpeed: 1,
            scrollingThreshold: 1000,
            wheelPropagation: false,
          });
    
          $(window).on('resize', function(){
            ps.update();
          })
        });`;
        this.renderer.appendChild(this.document.body, script);
      }, 500);
  }


}
