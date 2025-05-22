import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielRoutingModule } from './materiel-routing.module';
import { MaterielComponent } from './materiel.component';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MaterielDialogComponent } from '../dialogs/materiel-dialog/materiel-dialog.component';


@NgModule({
  declarations: [
    MaterielComponent,
    MaterielDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterielRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class MaterielModule { }
