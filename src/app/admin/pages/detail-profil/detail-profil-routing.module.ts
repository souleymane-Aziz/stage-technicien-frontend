import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProfilComponent } from './detail-profil.component';

const routes: Routes = [
  {
    path:'',
    component: DetailProfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailProfilRoutingModule { }
