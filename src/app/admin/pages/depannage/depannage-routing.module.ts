import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepannageComponent } from './depannage.component';

const routes: Routes = [
  {
    path: '',
    component: DepannageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepannageRoutingModule { }
