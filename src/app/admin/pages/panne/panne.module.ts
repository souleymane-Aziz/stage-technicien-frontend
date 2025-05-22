import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanneRoutingModule } from './panne-routing.module';
import { PanneComponent } from './panne.component';
import { FormsModule } from '@angular/forms';
import { PanneDialogComponent } from '../dialogs/panne-dialog/panne-dialog.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/shared/modules/material.module';




@NgModule({
  declarations: [PanneComponent, PanneDialogComponent],
  imports: [
    CommonModule,
    PanneRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule

  ]
})
export class PanneModule { }
