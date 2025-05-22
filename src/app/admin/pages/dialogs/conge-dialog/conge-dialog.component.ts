import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CongeService } from 'src/app/admin/services/conge.service';
import { TypecongeService } from 'src/app/admin/services/typeconge.service';
import { Conges } from 'src/app/shared/models/conges';
import { TypeConge } from 'src/app/shared/models/typeconge';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-conge-dialog',
  templateUrl: './conge-dialog.component.html',
  styleUrls: ['./conge-dialog.component.css']
})
export class CongeDialogComponent implements OnInit {
  public loading: boolean;
  public conge = new Conges;
  public typeconges:TypeConge[]=[];

  constructor(
    public dialogRef: MatDialogRef<CongeDialogComponent>,
    private congeService: CongeService,
    private toast: AppToastService,
    private typecongeService:TypecongeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
 this.conge = this.data.conge;
 this.typeconges = this.data.typeconges;
 console.log("++++test++++",this.data.typeconges)
 this.findtypeconge();
  }
  onNoClick(): void {
    this.dialogRef.close;
  }
  save(){
    if (!this.conge.id)
    {this.congeService.save(this.conge).subscribe((ret:any) => {
      this.conge=ret;
      this.toast.success("Le congé a été enregistrer avec succès !");
      this.dialogRef.close(this.conge);
    })}else{
    if(this.conge.id){
        this.congeService.update(this.conge).subscribe(ret=>{
          this.toast.success("Le congé a été modifier avec succès !");
          this.dialogRef.close(this.conge);
        })
    }
    } 
   
  }
  findtypeconge(){
      this.typecongeService.findAlltypeconge().subscribe((ret:any)=>{
        this.typeconges=ret;
        console.log("type de conge",this.typeconges)
      })
  }

 
}
