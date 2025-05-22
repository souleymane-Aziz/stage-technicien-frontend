import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielComponent } from './materiel.component';

const routes: Routes = [
  {
    path: '',
    component: MaterielComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterielRoutingModule { }
