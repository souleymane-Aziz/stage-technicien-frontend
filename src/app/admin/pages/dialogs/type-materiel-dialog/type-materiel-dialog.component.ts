import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeMaterielService } from 'src/app/admin/services/type-materiel.service';
import { TypeMateriel } from 'src/app/shared/models/type-materiel';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type-materiel-dialog',
  templateUrl: './type-materiel-dialog.component.html',
  styleUrls: ['./type-materiel-dialog.component.css']
})
export class TypeMaterielDialogComponent implements OnInit {
  public typeMateriel: TypeMateriel;
  public loading: boolean;
  public currentUser: any;
  constructor(
    public dialogRef: MatDialogRef<TypeMaterielDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private typeMaterielService: TypeMaterielService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.typeMateriel = this.data.typeMateriel;
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  save() {
    console.log('======= typeMateriel======', this.typeMateriel)
    this.loading = true;
    if (this.typeMateriel.id) {
      this.typeMaterielService.update(this.typeMateriel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.typeMateriel = ret['response'];
          this.dialogRef.close(this.typeMateriel);
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
      this.typeMateriel.utilisateur = this.currentUser;
      this.typeMaterielService.save(this.typeMateriel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.typeMateriel = ret['response'];
          this.dialogRef.close(this.typeMateriel);
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
