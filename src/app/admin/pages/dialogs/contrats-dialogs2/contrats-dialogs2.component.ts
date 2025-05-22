import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ContratService } from 'src/app/admin/services/contrat.service';
import { Conges } from 'src/app/shared/models/conges';

import { Contrats } from 'src/app/shared/models/contrats';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { AppConfig } from 'src/app/shared/utils/app-config';

@Component({
  selector: 'app-contrats-dialogs2',
  templateUrl: './contrats-dialogs2.component.html',
  styleUrls: ['./contrats-dialogs2.component.css']
})
export class ContratsDialogs2Component implements OnInit {
  public contrat:Contrats;

  
  constructor(
    public contratService:ContratService,
    public dialogRef: MatDialogRef<ContratsDialogs2Component>,
    private appConfig: AppConfig,
    private toast: AppToastService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
  
  }
 
  ngOnInit(): void {
    this.contrat=this.data
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  annuler(){
    this.contratService.annule(this.contrat).subscribe((ret:any)=>{
      this.contrat=ret
      this.dialogRef.close(this.contrat);
      this.toast.success("le contrat a été annuler avec success");
    })
      
      
  
    
  }
  
}
