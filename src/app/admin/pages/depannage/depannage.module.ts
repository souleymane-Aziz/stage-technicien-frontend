import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepannageRoutingModule } from './depannage-routing.module';
import { DepannageComponent } from './depannage.component';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { DepannageDialogComponent } from '../dialogs/depannage-dialog/depannage-dialog.component';



@NgModule({
  declarations: [DepannageComponent, DepannageDialogComponent],
  imports: [
    CommonModule,
    DepannageRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class DepannageModule { }
