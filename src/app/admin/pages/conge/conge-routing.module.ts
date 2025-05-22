import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongeComponent } from './conge.component';

const routes: Routes = [
  {
    path:"",
    component: CongeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
