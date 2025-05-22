import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./pages/administration/administration.module')
          .then(m => m.AdministrationModule)
      },
      {
        path: 'materiel',
        loadChildren: () => import('./pages/materiel/materiel.module')
          .then(m => m.MaterielModule)
      },
      {
        path: 'panne',
        loadChildren: () => import('./pages/panne/panne.module').then(m => m.PanneModule)
      },
      {
        path: 'prestataire',
        loadChildren: () => import('./pages/prestataire/prestataire.module').then(m => m.PrestataireModule)
      },
      {
        path: 'depannage',
        loadChildren: () => import('./pages/depannage/depannage.module').then(m => m.DepannageModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)
      },
      {
        path: 'affectation',
        loadChildren: () => import('./pages/affectation/affectation.module').then(m => m.AffectationModule)
      },
      {
        path: 'mon-profil',
        loadChildren: () => import('./pages/detail-profil/detail-profil.module')
          .then(m => m.DetailProfilModule)
      },
      {
        path: 'contrats',
        loadChildren: () => import('./pages/contrats/contrats.module')
          .then(m => m.ContratsModule)
      },
      {
        path: 'conge',
        loadChildren: () => import('./pages/conge/conge.module')
          .then(m => m.CongeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
