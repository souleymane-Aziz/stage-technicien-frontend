import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongeRoutingModule } from './conge-routing.module';
import { CongeComponent } from './conge.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CongeDialogComponent } from '../dialogs/conge-dialog/conge-dialog.component';
import { FormsModule } from '@angular/forms';
import { CongeDialogs2Component } from '../dialogs/conge-dialogs2/conge-dialogs2.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ValiderCongeComponent } from '../dialogs/valider-conge/valider-conge.component';
import { NgxPrintModule } from 'ngx-print';
import { ImprimerCongeDialogsComponent } from '../dialogs/imprimer-conge-dialogs/imprimer-conge-dialogs.component';


@NgModule({
  declarations: [  CongeComponent, CongeDialogComponent,  CongeDialogs2Component, ValiderCongeComponent, ImprimerCongeDialogsComponent],
  imports: [
    CommonModule,
    CongeRoutingModule,
    MaterialModule,
    FormsModule,
    NgxLoadingModule,
    NgxPrintModule,
    NgxPrintModule
  ]
})
export class CongeModule { }
