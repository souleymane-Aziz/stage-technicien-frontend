import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterielService } from 'src/app/admin/services/materiel.service';
import { TypeMaterielService } from 'src/app/admin/services/type-materiel.service';
import { Materiel } from 'src/app/shared/models/materiel';
import { TypeMateriel } from 'src/app/shared/models/type-materiel';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-materiel-dialog',
  templateUrl: './materiel-dialog.component.html',
  styleUrls: ['./materiel-dialog.component.css']
})
export class MaterielDialogComponent implements OnInit {
  public materiel: Materiel;
  public loading: boolean;
  public currentUser: any;
  public typeMateriel: TypeMateriel;
  public typeMateriels: TypeMateriel[] = [];
  public typeMaterielFilter = { libelle: '' };
  constructor(
    public dialogRef: MatDialogRef<MaterielDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materielService: MaterielService,
    private typeMaterielService: TypeMaterielService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.materiel = this.data.materiel;
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }
  initTypeMateriels() {
    const param = new SearchParam();
    param.criteria = '1';
    this.typeMaterielService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.typeMateriels = ret['response'];
        this.loading = false;
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  save() {
    console.log('======= materiel======', this.materiel)
    this.loading = true;
    if (this.materiel.id) {
      this.materielService.update(this.materiel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.materiel = ret['response'];
          this.dialogRef.close(this.materiel);
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
      this.materiel.utilisateur = this.currentUser;
      this.materielService.save(this.materiel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.materiel = ret['response'];
          this.dialogRef.close(this.materiel);
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
}
