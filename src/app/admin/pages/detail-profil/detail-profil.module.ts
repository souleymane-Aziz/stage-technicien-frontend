import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProfilRoutingModule } from './detail-profil-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { DetailProfilComponent } from './detail-profil.component';


@NgModule({
  declarations: [DetailProfilComponent],
  imports: [
    CommonModule,
    DetailProfilRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule
  ]
})
export class DetailProfilModule { }
