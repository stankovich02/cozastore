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
  { path: "products/:id",
    loadChildren: () => import('./pages/single-product/single-product.module').then(m => m.SingleProductModule) 
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
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "register",
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  { 
    path: '**', 
    redirectTo: '404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
