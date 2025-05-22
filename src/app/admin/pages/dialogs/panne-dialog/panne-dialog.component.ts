import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AffectationService } from 'src/app/admin/services/affectation.service';
import { PanneService } from 'src/app/admin/services/panne.service';
import { Affectation } from 'src/app/shared/models/affectation';
import { Panne } from 'src/app/shared/models/panne';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panne-dialog',
  templateUrl: './panne-dialog.component.html',
  styleUrls: ['./panne-dialog.component.css']
})
export class PanneDialogComponent implements OnInit {
  public panne: Panne;
  public loading: boolean;
  public currentUser: any;
  public affectations: Affectation[] = [];
  public affectation: Affectation;
  public affectationFilter= {nom: ''}
  constructor(
    public dialogRef: MatDialogRef<PanneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private panneService: PanneService,
    private affectationService: AffectationService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.panne = this.data.panne;
    this.initAffectations();
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  save() {
    this.loading = true;
    if (this.panne.id) {
      this.panneService.update(this.panne).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.panne = ret['response'];
          this.dialogRef.close(this.panne);
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
      this.panne.utilisateur = this.currentUser;
      this.panneService.save(this.panne).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.panne = ret['response'];
          this.dialogRef.close(this.panne);
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
  initAffectations(){
    let param = new SearchParam();
    param.criteria= '2';
    param.enabled = true;
    this.affectationService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.affectations = ret['response'];
        if (this.panne.id && this.affectations.length > 0) {
          this.panne.affectation = this.affectations.find(p => p.id === this.panne.affectation.id);
        }
        console.log("======affectation=====", this.affectations)
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
