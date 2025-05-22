import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceService } from 'src/app/admin/services/maintenance.service';
import { Maintenance } from 'src/app/shared/models/maintenance';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maintenance-dialog',
  templateUrl: './maintenance-dialog.component.html',
  styleUrls: ['./maintenance-dialog.component.css']
})
export class MaintenanceDialogComponent implements OnInit {
  public maintenance: Maintenance;
  public loading: boolean;
  public currentUser: any;
  constructor(
    public dialogRef: MatDialogRef<MaintenanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private maintenanceService: MaintenanceService,
    private toast: AppToastService,
    private appConfig: AppConfig
    ) {
      this.currentUser = this.appConfig.currentUser;
    }

  ngOnInit(): void {
    this.maintenance = this.data.maintenance;
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  save() {
    this.loading = true;
    if (this.maintenance.id) {
      this.maintenanceService.update(this.maintenance).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.maintenance = ret['response'];
          this.dialogRef.close(this.maintenance);
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
      this.maintenance.utilisateur = this.currentUser;
      this.maintenanceService.save(this.maintenance).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.maintenance = ret['response'];
          this.dialogRef.close(this.maintenance);
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
