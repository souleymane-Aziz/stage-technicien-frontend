import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilisateurService } from 'src/app/admin/services/utilisateur.service';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';

@Component({
  selector: 'app-reinitialiser-dialog',
  templateUrl: './reinitialiser-dialog.component.html',
  styleUrls: ['./reinitialiser-dialog.component.css']
})
export class ReinitialiserDialogComponent implements OnInit {

  public utilisateur: Utilisateur;
  public loading: boolean;
  public confirmPassword: string;
  public authUser: AuthUser = new AuthUser();

  constructor(
    private utilisateurService: UtilisateurService,
    private toast: AppToastService,
    public dialogRef: MatDialogRef<ReinitialiserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.utilisateur = this.data.utilisateur;
    this.authUser.newPassword = '';
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  valider(): void {
    if (this.utilisateur.newPassword.length <= 0) {
      this.toast.warning("Tous les champs sont obligatoire");
      return;
    }
    if (this.utilisateur.newPassword.length < 5) {
      this.toast.warning("Le nouveau mot de passe doit être supérieur à 5 caractères");
      return;
    }
    if (this.utilisateur.newPassword !== this.confirmPassword) {
      this.toast.warning("Veuillez confirmez votre mot de passe");
      return;
    }
    this.loading = true;
    this.utilisateurService.resetPassword(this.utilisateur).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.loading = false;
        this.dialogRef.close('valider');
        this.toast.success(ret['message']);
      } else {
        this.loading = false;
        this.toast.error(ret['message']);
      }
    }, error => {
      console.log("error====>", error);
      this.loading = false;
      this.toast.error('Une erreur est survenue lors de l\'opération');
    });
  }

}
