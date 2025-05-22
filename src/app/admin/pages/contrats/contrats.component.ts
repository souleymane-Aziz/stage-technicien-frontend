import { AfterViewInit, Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contrats } from 'src/app/shared/models/contrats';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { ContratsDialogComponent } from '../dialogs/contrats-dialog/contrats-dialog.component';
import { ContratService } from '../../services/contrat.service';
import { environment } from 'src/environments/environment';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { ContratsDialogs2Component } from '../dialogs/contrats-dialogs2/contrats-dialogs2.component';
import { EmployeService } from '../../services/employe.service';
import { Employes } from 'src/app/shared/models/employe';
@Injectable()
@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})

export class ContratsComponent implements OnInit {
  displayedColumns : string [] = [ 'position','type','employe' , 'description' , 'dateDebut' , 'dateFin' ,'etat','option'];
  dataSource: MatTableDataSource<Contrats>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;
  public contrat: Contrats;
  public contrats: Contrats[] = [];
  public employes: Employes;
  public currentUser: any;
  public roleManager: RoleManager;
  public searchParam: SearchParam;
  public loading: boolean;
  public dialogAction: string;
  
  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private appConfig: AppConfig,
    private contratService:ContratService,
    private employeService:EmployeService,
    private toast: AppToastService,
    ) { 
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new SearchParam();

    }
  ngOnInit() {
   this.findAllEmploye()
   console.log("employes",this.employes)
  
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Supprimer les espaces
    filterValue = filterValue.toLowerCase(); // MatTableDataSource utilise par défaut des correspondances en minuscules
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  private initDataTable(contrats:Contrats[]) {
    this.dataSource = new MatTableDataSource(contrats);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showAddDialog(): void {
    console.log("utilisateur courant",this.employes)
    this.contrat = new Contrats();
    const dialogConfig = this.matDialogConfig.config({
      contrat: this.contrat
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(ContratsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.contrat = result;
        this.contrats.push(this.contrat);
        this.initDataTable(this.contrats);

      }
    });
  } 
  showEditDialog(contrat:Contrats): void {
    const dialogConfig = this.matDialogConfig.config({
     contrat:contrat
    
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(ContratsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.contrat = result;
        this.initDataTable(this.contrats);
      }
    });
  }

openDialog(): void {
  this.contrat = new Contrats();
    const dialogConfig = this.matDialogConfig.config({
      contrat: this.contrat

})
}
showConfirmerDialog(cont: Contrats): void {
  this.contrat=cont;
  console.log("contrat:",this.contrat)
  const dialogRef = this.dialog.open(ContratsDialogs2Component, {
      data:this.contrat
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.contrat = result;
  });
}
findAll() { 
  
  //this.loading = true;
  this.contratService.findAll().subscribe((ret:any)=> {
    this.contrats=ret
    this.initDataTable(this.contrats)
   
})
}
findAllEmploye(){
  this.employeService.findAllEmploye().subscribe((ret:any)=>{
    this.employes=ret
  })
}

}

