import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/components/admin/admin.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { NamedEntityComponent } from './components/named-entity/named-entity.component';
import { DiscountComponent } from './components/discount/discount.component';


@NgModule({
  declarations: [
    GenericTableComponent,
    AdminComponent,
    DashboardComponent,
    ProductComponent,
    NamedEntityComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,

  ]
})
export class AdminModule { }
