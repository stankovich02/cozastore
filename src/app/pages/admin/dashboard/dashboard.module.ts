import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { FormsModule } from '@angular/forms';
import { GenericCreateComponent } from './components/generic-create/generic-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
