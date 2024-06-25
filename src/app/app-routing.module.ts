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
    loadChildren:()=>import('./pages/client/home/home.module').then(m => m.HomeModule)
  },
  {
    path:"about",
    loadChildren:()=>import('./pages/client/about/about.module').then(m => m.AboutModule)
  },
  {
    path:"shop",
    loadChildren:()=>import('./pages/client/shop/shop.module').then(m => m.ShopModule)
  },
  { path: "products/:id",
    loadChildren: () => import('./pages/client/single-product/single-product.module').then(m => m.SingleProductModule) 
  },
  {
    path:"contact",
    loadChildren:()=>import('./pages/client/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path:"cart",
    loadChildren:()=>import('./pages/client/cart/cart.module').then(m => m.CartModule)
  },
  {
    path:"wishlist",
    loadChildren:()=>import('./pages/client/wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: "login",
    loadChildren: () => import('./pages/client/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "register",
    loadChildren: () => import('./pages/client/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: "checkout",
    loadChildren: () => import('./pages/client/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path:"admin/dashboard",
    loadChildren:()=>import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'admin', 
    pathMatch: 'prefix',
    loadChildren:()=>import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
