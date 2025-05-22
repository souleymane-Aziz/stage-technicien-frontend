import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationComponent } from './affectation.component';

const routes: Routes = [
  {
    path: '',
    component: AffectationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationRoutingModule { }
