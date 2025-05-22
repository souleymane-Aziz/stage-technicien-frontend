import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';



@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenanceDialogComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class MaintenanceModule { }
