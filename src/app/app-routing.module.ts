import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"home"
  },
  {
    path:"home",
    loadChildren:()=>import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:"about",
    loadChildren:()=>import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path:"shop",
    loadChildren:()=>import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path:"contact",
    loadChildren:()=>import('./contact/contact.module').then(m => m.ContactModule)
  },
  { 
    path: '**', 
    redirectTo: '404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
