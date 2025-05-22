import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanneComponent } from './panne.component';

const routes: Routes = [
  {
    path: '',
    component: PanneComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanneRoutingModule { }
