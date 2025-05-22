import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { LogComponent } from './log/log.component';
import { MenuComponent } from './menu/menu.component';
import { ProfilComponent } from './profil/profil.component';
import { TypeMaterielComponent } from './type-materiel/type-materiel.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      },
      {
        path: 'employe',
        component: UtilisateurComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'type-materiel',
        component: TypeMaterielComponent
      },
      {
        path: 'logs',
        component: LogComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
