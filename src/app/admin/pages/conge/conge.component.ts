import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conges } from 'src/app/shared/models/conges';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { CongeDialogComponent } from '../dialogs/conge-dialog/conge-dialog.component';

import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { CongeService } from '../../services/conge.service';
import { Observable } from 'rxjs';
import { CongeDialogs2Component } from '../dialogs/conge-dialogs2/conge-dialogs2.component';
import { ThisReceiver } from '@angular/compiler';
import { ValiderCongeComponent } from '../dialogs/valider-conge/valider-conge.component';
import { ImprimerCongeDialogsComponent } from '../dialogs/imprimer-conge-dialogs/imprimer-conge-dialogs.component';
import { TypeConge } from 'src/app/shared/models/typeconge';
import { TypecongeService } from '../../services/typeconge.service';



@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],

})
export class CongeComponent implements OnInit {
  public conge: Conges;
  public conges: Conges[]=[];
  public typeconges: TypeConge []=[];
  public loading: boolean;
  public roleManager: RoleManager;
  public searchParam: SearchParam;
  public currentPage = 'list';
  public currentUser: any;
  displayedColumns : string [] = [ 'position','type','duree' , 'description','date_debut','date_fin','etat','option'];
  dataSource: MatTableDataSource<Conges>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;
  


  constructor(
    private matDialogConfig: MyMatDialogConfig,
    private congeService:CongeService,
    private typecongeService:TypecongeService,
    public dialog: MatDialog,
    private toast: AppToastService,
   
    private appConfig: AppConfig,
    
  ) { 
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new SearchParam();
  }
  private initDataTable(conges:Conges[]) {
   // this.conges=liste
    this.dataSource = new MatTableDataSource(conges);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprimer les espaces
    filterValue = filterValue.toLowerCase(); // MatTableDataSource utilise par défaut des correspondances en minuscules
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
  }
  
  showList() {
    this.currentPage = 'list';
  }
  showAddDialog(): void {
  
    this.conge = new Conges();
    const dialogConfig = this.matDialogConfig.config({
      conge: this.conge,
      typeconge:this.typeconges
     
      
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(CongeDialogComponent , dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.conge = result;
        this.conges.push(this.conge);
       // this.initDataTable(this.conges);

      }
    });
  }
 
  findAll() { 
    this.congeService.findAll().subscribe((ret:any)=> {
      this.conges=ret;
      this.initDataTable(this.conges)
  })
  
}
findAlltypeconge(){
  this.typecongeService.findAlltypeconge().subscribe((ret:any)=>{
    this.typeconges=ret;
    console.log("++++++typedeconge++++++",ret);
 
  })
}
  

  showEditDialog(con: Conges): void {
    
    const dialogConfig = this.matDialogConfig.config({
      conge: con
    
    });
   
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(CongeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.conge = result;
        this.initDataTable(this.conges);
      }
    });
  }
 
  showConfirmerDialog(cont:Conges): void {
    this.conge=cont;
    console.log("congé est:",this.conge);
    const dialogRef = this.dialog.open(CongeDialogs2Component, {
      data:this.conge
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.conge = result;
    });
  }
  ValiderDialog(con:Conges): void {
    this.conge=con;
    console.log("++++++++++++++",con);
    const dialogRef = this.dialog.open(ValiderCongeComponent, {
      data:this.conge
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.conge = result; 
    });

  }
  showDialogImprimer(cong:Conges): void{
    
   
    const dialogRef = this.dialog.open(ImprimerCongeDialogsComponent, {
      data:cong
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.conge = result; 
    });
  }
}
