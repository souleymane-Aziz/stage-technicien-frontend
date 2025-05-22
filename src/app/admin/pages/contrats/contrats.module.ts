import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratsRoutingModule } from './contrats-routing.module';
import { ContratsComponent } from './contrats.component';
import { DepannageRoutingModule } from '../depannage/depannage-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ContratsDialogComponent } from '../dialogs/contrats-dialog/contrats-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContratsDialogs2Component } from '../dialogs/contrats-dialogs2/contrats-dialogs2.component';


@NgModule({
  declarations: [ContratsComponent ,ContratsDialogComponent,  ContratsDialogs2Component,],
  imports: [
    CommonModule,
    ContratsRoutingModule,
    CommonModule,
    DepannageRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxLoadingModule,
    FilterPipeModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule
    
  ]
})
export class ContratsModule { }
