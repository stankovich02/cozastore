import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/components/admin/admin.component';
import { ProductComponent } from './components/product/product.component';
import { NamedEntityComponent } from './components/named-entity/named-entity.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
  },
  {
    path: "products/create",
    pathMatch: "prefix",
    component: ProductComponent,
  },
  {
    path: "products/:id/update",
    pathMatch: "prefix",
    component: ProductComponent,
  },
  {
    path: "categories/create",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "categories/:id/update",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "brands/create",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "brands/:id/update",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "colors/create",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "colors/:id/update",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "sizes/create",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "sizes/:id/update",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "genders/create",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "genders/:id/update",
    pathMatch: "prefix",
    component: NamedEntityComponent,
  },
  {
    path: "**",
    component: AdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
