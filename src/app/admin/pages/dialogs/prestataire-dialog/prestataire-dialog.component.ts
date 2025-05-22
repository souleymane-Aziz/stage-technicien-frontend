import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestataireService } from 'src/app/admin/services/prestataire.service';
import { Prestataire } from 'src/app/shared/models/prestataire';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prestataire-dialog',
  templateUrl: './prestataire-dialog.component.html',
  styleUrls: ['./prestataire-dialog.component.css']
})
export class PrestataireDialogComponent implements OnInit {
  public prestataire: Prestataire;
  public loading: boolean;
  public currentUser: any;
  constructor(
    public dialogRef: MatDialogRef<PrestataireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestataireService: PrestataireService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.prestataire = this.data.prestataire;
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }
  save() {
    this.loading = true;
    if (this.prestataire.id) {
      this.prestataireService.update(this.prestataire).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.prestataire = ret['response'];
          this.dialogRef.close(this.prestataire);
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
      this.prestataire.utilisateur = this.currentUser;
      this.prestataireService.save(this.prestataire).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.prestataire = ret['response'];
          this.dialogRef.close(this.prestataire);
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
