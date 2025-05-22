import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AffectationService } from 'src/app/admin/services/affectation.service';
import { MaterielService } from 'src/app/admin/services/materiel.service';
import { UtilisateurService } from 'src/app/admin/services/utilisateur.service';
import { Affectation } from 'src/app/shared/models/affectation';
import { Materiel } from 'src/app/shared/models/materiel';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-affectation-dialog',
  templateUrl: './affectation-dialog.component.html',
  styleUrls: ['./affectation-dialog.component.css']
})
export class AffectationDialogComponent implements OnInit {
  public affectation: Affectation;
  public loading: boolean;
  public currentUser: any;
  public materiels: Materiel[] = [];
  public materielFilter= {nom: ''}
  public utilisateurs: Utilisateur[] = [];
  public utilisateurFilter= {nomComplet: ''}
  constructor(
    public dialogRef: MatDialogRef<AffectationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private affectationService: AffectationService,
    private materielService: MaterielService,
    private utilisateurService: UtilisateurService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.affectation = this.data.affectation;
    this.initMateriels();
    this.initEmployes();
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  save() {
    this.loading = true;
    if (this.affectation.id) {
      this.affectation.employe
      this.affectationService.update(this.affectation).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.affectation = ret['response'];
          this.dialogRef.close(this.affectation);
          this.loading = false;
          this.toast.success(ret['message']);
        } else {
          this.loading = false;
          this.toast.error(ret['message']);
        }
      }, error => {
        this.toast.error(environment.erreur_connexion_message);
        this.loading = false;
      });
    } else {
      this.affectation.utilisateur = this.currentUser;
      this.affectation.employe;
      this.affectationService.save(this.affectation).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.affectation = ret['response'];
          this.dialogRef.close(this.affectation);
          this.loading = false;
          this.toast.success(ret['message']);
        } else {
          this.loading = false;
          this.toast.error(ret['message']);
        }
      }, error => {
        this.toast.error(environment.erreur_connexion_message);
        this.loading = false;
      });
    }
  }
  initMateriels(){
    let param = new SearchParam();
    param.criteria= '2';
    console.log("======param=====", param)
    param.enabled = true;
    this.materielService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.materiels = ret['response'];
        if ((this.affectation.id && this.materiels.length > 0) || this.affectation.materiel.id) {
          this.affectation.materiel = this.materiels.find(d => d.id === this.affectation.materiel.id);
        }
        console.log("======materiel=====", this.materiels)
        this.loading = false;
      } else {
        this.loading = false;
        this.toast.error(ret['message']);
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }
  initEmployes(){
    let param = new SearchParam();
    param.criteria= '1';
    console.log("======param=====", param)
    param.enabled = true;
    this.utilisateurService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.utilisateurs = ret['response'];
        if ((this.affectation.id && this.utilisateurs.length > 0) || this.affectation.utilisateur.id) {
          this.affectation.utilisateur = this.utilisateurs.find(d => d.id === this.affectation.utilisateur.id);
        }
        console.log("======utilisateur=====", this.utilisateurs)
        this.loading = false;
      } else {
        this.loading = false;
        this.toast.error(ret['message']);
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }
}
