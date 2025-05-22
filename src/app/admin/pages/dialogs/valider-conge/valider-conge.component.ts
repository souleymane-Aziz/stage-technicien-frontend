import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CongeService } from 'src/app/admin/services/conge.service';
import { Conges } from 'src/app/shared/models/conges';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';

@Component({
  selector: 'app-valider-conge',
  templateUrl: './valider-conge.component.html',
  styleUrls: ['./valider-conge.component.css']
})
export class ValiderCongeComponent implements OnInit {
  public conge:Conges;
  constructor(
    public dialogRef: MatDialogRef<ValiderCongeComponent>,
    private congeService:CongeService,
    private toast: AppToastService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.conge=this.data
    console.log("+++++++++data supp++++",this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
 valide(){ 
   this.congeService.valide(this.conge).subscribe(ret=>{
    this.toast.success("Le congé a été validé avec succès !");
     console.log("++++++++++++++++++++++++++",ret);
     this.dialogRef.close(this.conge)
   })
      
  
  }
}
