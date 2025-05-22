import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CongeService } from 'src/app/admin/services/conge.service';
import { Conges } from 'src/app/shared/models/conges';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';

@Component({
  selector: 'app-conge-dialogs2',
  templateUrl: './conge-dialogs2.component.html',
  styleUrls: ['./conge-dialogs2.component.css']
})
export class CongeDialogs2Component implements OnInit {
  public conge:Conges;
  constructor(
    public dialogRef: MatDialogRef<CongeDialogs2Component>,
    private congeService:CongeService,
    private toast: AppToastService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.conge=this.data
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  annuler(){ 
    console.log("l'id est :",this.conge.id)
    this.congeService.annule(this.conge).subscribe((ret:any)=>{
      this.toast.success("le contrat a été annuler avec success");
      this.conge=ret
      this.dialogRef.close(this.conge)
    })     
  }
}
