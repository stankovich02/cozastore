import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './components/dasboard/dasboard.component';

const routes: Routes = [
  {
    path: '',
    component: DasboardComponent
  },
  {
    path: '**',
    component: DasboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
