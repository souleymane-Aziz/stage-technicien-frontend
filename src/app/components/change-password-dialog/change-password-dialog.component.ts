import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/admin/services/auth.service';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
public authUser: AuthUser;
public loading: boolean

  constructor(
    private authService: AuthService,
    private toast: AppToastService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.authUser = new AuthUser();
    this.authUser.id = this.data.userId;
    this.authUser.userId = this.data.userId;
    /* this.authUser.newPassword = '';
    this.authUser.oldPassword = '';
    this.authUser.confirmPassword = ''; */
  }

  onNoClick(): void {
    this.dialogRef.close('annuler');
  }

  valider(): void {
    if(this.authUser.newPassword.length <= 0 || this.authUser.oldPassword.length <= 0 ){
      this.toast.warning("Tous les champs sont obligatoire");
      return;
    }
    if(this.authUser.newPassword.length < 5 ){
      this.toast.warning("Le nouveau mot de passe doit être supérieur à 5 caractères");
      return;
    }
    if(this.authUser.newPassword !== this.authUser.confirmPassword){
      this.toast.warning("Veuillez confirmez votre mot de passe");
      return;
    }
    this.loading = true;
    this.authService.changePassword(this.authUser).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.dialogRef.close('valider');
        this.toast.success(ret['message']);
      } else {
        this.toast.error(ret['message']);
      }
      this.loading = false;
    }, error => {
      console.log("error====>", error);
      this.loading = false;
      this.toast.error('Une erreur est survenue lors de l\'opération');
    });
  }
}
