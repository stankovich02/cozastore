import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleProductRoutingModule } from './single-product-routing.module';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    SingleProductRoutingModule,
    SharedModule
  ]
})
export class SingleProductModule { }
