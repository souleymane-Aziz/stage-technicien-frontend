import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireComponent } from './prestataire.component';
import { FormsModule } from '@angular/forms';
import { PrestataireDialogComponent } from '../dialogs/prestataire-dialog/prestataire-dialog.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/shared/modules/material.module';



@NgModule({
  declarations: [PrestataireComponent, PrestataireDialogComponent],
  imports: [
    CommonModule,
    PrestataireRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class PrestataireModule { }
