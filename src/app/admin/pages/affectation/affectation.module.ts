import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffectationRoutingModule } from './affectation-routing.module';
import { AffectationComponent } from './affectation.component';
import { FormsModule } from '@angular/forms';
import { AffectationDialogComponent } from '../dialogs/affectation-dialog/affectation-dialog.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/shared/modules/material.module';


@NgModule({
  declarations: [AffectationComponent, AffectationDialogComponent],
  imports: [
    CommonModule,
    AffectationRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class AffectationModule { }
