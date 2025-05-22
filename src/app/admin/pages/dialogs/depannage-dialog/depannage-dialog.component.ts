import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepannageService } from 'src/app/admin/services/depannage.service';
import { PrestataireService } from 'src/app/admin/services/prestataire.service';
import { Depannage } from 'src/app/shared/models/depannage';
import { Prestataire } from 'src/app/shared/models/prestataire';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-depannage-dialog',
  templateUrl: './depannage-dialog.component.html',
  styleUrls: ['./depannage-dialog.component.css']
})
export class DepannageDialogComponent implements OnInit {
  public depannage: Depannage;
  public loading: boolean;
  public currentUser: any;
  public prestataires: Prestataire[] = [];
  public prestataireFilter= {nomComplet: ''}
  constructor(
    public dialogRef: MatDialogRef<DepannageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private depannageService: DepannageService,
    private prestataireService: PrestataireService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.initPrestataires();
    this.depannage = this.data.depannage;
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  save() {
    this.loading = true;
    if (this.depannage.id) {
      this.depannageService.update(this.depannage).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.depannage = ret['response'];
          this.dialogRef.close(this.depannage);
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
      this.depannage.utilisateur = this.currentUser;
      this.depannageService.save(this.depannage).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.depannage = ret['response'];
          this.dialogRef.close(this.depannage);
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
  initPrestataires(){
    let param = new SearchParam();
    param.criteria= '2';
    console.log("======param=====", param)
    param.enabled = true;
    this.prestataireService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.prestataires = ret['response'];
        if ((this.depannage.id && this.prestataires.length > 0) || this.depannage.prestataire.id) {
          this.depannage.prestataire = this.prestataires.find(d => d.id === this.depannage.prestataire.id);
        }
        console.log("======prestataire=====", this.prestataires)
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
