import { Component, Inject,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Conges } from 'src/app/shared/models/conges';
import { AppConfig } from 'src/app/shared/utils/app-config';

@Component({
  selector: 'app-imprimer-conge-dialogs',
  templateUrl: './imprimer-conge-dialogs.component.html',
  styleUrls: ['./imprimer-conge-dialogs.component.css']
})
export class ImprimerCongeDialogsComponent implements OnInit {
  public conge:Conges;
  public currentUser: any;
  dataSource: MatTableDataSource<Conges>;
  constructor(
    private appConfig: AppConfig,
    public dialogRef: MatDialogRef<ImprimerCongeDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.currentUser = this.appConfig.currentUser;
   }
   

  ngOnInit(): void {
    this.conge=this.data
    console.log("+++++mes data++++",this.conge)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  printThispage(){
    window.print();
  }
}
