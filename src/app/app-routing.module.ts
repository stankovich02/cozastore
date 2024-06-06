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
    loadChildren:()=>import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path:"about",
    loadChildren:()=>import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path:"shop",
    loadChildren:()=>import('./pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path:"contact",
    loadChildren:()=>import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path:"cart",
    loadChildren:()=>import('./pages/cart/cart.module').then(m => m.CartModule)
  },
  {
    path:"wishlist",
    loadChildren:()=>import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule)
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
