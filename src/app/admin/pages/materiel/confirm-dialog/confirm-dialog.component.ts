import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterielService } from 'src/app/admin/services/materiel.service';
import { Materiel } from 'src/app/shared/models/materiel';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public materiel: Materiel;
  public loading: boolean;
  public dialogAction: string;

  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materielService: MaterielService,
    private toast: AppToastService,
  ) { }

  ngOnInit(): void {
    this.materiel = this.data.materiel;
    this.dialogAction = this.data.dialogAction;
    this.openConfirmDialog.nativeElement.click();
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  activate() {
    this.loading = true;
    this.materielService.activate(this.materiel).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.materiel = ret['response'];
        this.loading = false;
        this.toast.success(ret['message']);
        this.dialogRef.close(this.materiel);
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      console.log('erreur==>', error);
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  desactivate() {
    this.loading = true;
    this.materielService.desactivate(this.materiel).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.materiel = ret['response'];
        this.loading = false;
        this.toast.success(ret['message']);
        this.dialogRef.close(this.materiel);
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      console.log('erreur==>', error);
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }
}
