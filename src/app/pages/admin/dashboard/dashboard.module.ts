import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DasboardComponent,
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
