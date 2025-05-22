import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { MenuComponent } from './menu/menu.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ReinitialiserDialogComponent } from './utilisateur/reinitialiser-dialog/reinitialiser-dialog.component';
import { FormsModule } from '@angular/forms';
import { LogComponent } from './log/log.component';
import { TypeMaterielComponent } from './type-materiel/type-materiel.component';
import { TypeMaterielDialogComponent } from '../dialogs/type-materiel-dialog/type-materiel-dialog.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    MenuComponent,
    UtilisateurComponent,
    ProfilComponent,
    ReinitialiserDialogComponent,
    LogComponent,
    TypeMaterielComponent,
    TypeMaterielDialogComponent
   

  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministrationRoutingModule,
    MaterialModule,
    NgxLoadingModule,
    FilterPipeModule
  ]
})
export class AdministrationModule { }
