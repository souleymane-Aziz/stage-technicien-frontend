import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContratService } from 'src/app/admin/services/contrat.service';
import { EmployeService } from 'src/app/admin/services/employe.service';
import { Type } from 'src/app/shared/models/action';

import { Contrats } from 'src/app/shared/models/contrats';
import { Employes } from 'src/app/shared/models/employe';
import { TypeContrats } from 'src/app/shared/models/typecontrat';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contrats-dialog',
  templateUrl: './contrats-dialog.component.html',
  styleUrls: ['./contrats-dialog.component.css']
})
export class ContratsDialogComponent implements OnInit {

  public loading: boolean;
  public contrat = new Contrats();
  public employes: Employes[]=[];
  public currentUser: any;

  constructor(
    public dialogRef: MatDialogRef<ContratsDialogComponent>,
    public contratService : ContratService,
    private employeService:EmployeService,
    private toast: AppToastService,
    private appConfig: AppConfig,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentUser = this.appConfig.currentUser;
   }

  ngOnInit(): void {
    this.findAllEmploye();
    this.contrat=this.data.contrat
  }
    
  onNoClick(): void {
    this.dialogRef.close;
  }
  save() {
     console.log("---contrat---",this.contrat)
    if (!this.contrat.id) {
      this.contratService.save(this.contrat).subscribe(ret => {
      this.toast.success("Le contrat a été enregistrer avec succès !");
      this.dialogRef.close(this.contrat);
      });
    } else {
      this.contratService.update(this.contrat).subscribe(ret => {
        this.toast.success("Le contrat a été modifie avec succès !");
        this.dialogRef.close(this.contrat);
      });
    }
  }
  findAllEmploye(){
    this.employeService.findAllEmploye().subscribe((ret:any)=>{
      this.employes=ret
    })
  }
  typecontrat:TypeContrats[]=[
   {id:1, libelle:'CDD' },
   {id:1, libelle:'CDI' }
  ]
}
