import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Depannage } from 'src/app/shared/models/depannage';
import { Panne } from 'src/app/shared/models/panne';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { PanneService } from '../../services/panne.service';
import { DepannageDialogComponent } from '../dialogs/depannage-dialog/depannage-dialog.component';
import { PanneDialogComponent } from '../dialogs/panne-dialog/panne-dialog.component';

@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',
  styleUrls: ['./panne.component.css']
})
export class PanneComponent implements OnInit {
 
  public panne: Panne;
  public pannes: Panne[] = [];
  public depannage: Depannage;
  public depannages: Depannage[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  displayedColumns: string[] = ['libelle','type', 'datePanne','affectation', 'option'];
  dataSource: MatTableDataSource<Panne>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private panneService: PanneService,
    private toast: AppToastService,
    private appConfig: AppConfig
  ) {
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new SearchParam();
  }

  ngOnInit() {
    this.searchParam.criteria = '1';
    this.searchParam.dateDebut = new Date();
    this.searchParam.dateFin = new Date();
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 7);
  }

  private initDataTable(pannes: Panne[]) {
    this.dataSource = new MatTableDataSource(pannes);
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

  showList() {
    this.currentPage = 'list';
    this.pageTitle = 'Liste'
  }

  showAddDialog(): void {
    this.panne = new Panne();
    const dialogConfig = this.matDialogConfig.config({
      panne: this.panne
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(PanneDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.panne = result;
        this.pannes.push(this.panne);
        this.initDataTable(this.pannes);

      }
    });
  }

  showAdDepannagedDialog1( panne: Panne): void {
    const dialogConfig = this.matDialogConfig.config({
      panne: panne
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(DepannageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.panne = result;
        console.log("====== pannne =======", this.panne)
        this.initDataTable(this.pannes);
      }
    });
  }
  showAdDepannagedDialog(panne: Panne): void {
    this.panne = this.panne;
    console.log("====== pannne 1=======", this.panne)
    this.depannage = new Depannage();
    this.depannage.panne= panne
    console.log("====== pannne2 =======", this.panne)
    console.log("====== depannage =======",this.depannage.panne)
    const dialogConfig = this.matDialogConfig.config({
      depannage: this.depannage, panne: panne
    });
    dialogConfig.width = '25%';
    console.log("====== pannne 3=======", this.panne)
    const dialogRef = this.dialog.open(DepannageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.panne = result;
        this.pannes.push(this.panne);
        console.log("====== depannage =======", this.depannage)

        this.initDataTable(this.pannes);

      }
    });
  }
  showEditDialog(panne: Panne): void {
    const dialogConfig = this.matDialogConfig.config({
      panne: panne
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(PanneDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.panne = result;
        this.initDataTable(this.pannes);
      }
    });
  }
  showDetail(panne: Panne) {
    this.panne = panne;
    this.currentPage = 'detail';
    this.pageTitle = 'Détails panne'
  }
  showConfirmDialog(panne: Panne, action: string): void {
    this.dialogAction = action;
    this.panne = panne;
    this.openConfirmDialog.nativeElement.click();
  }

  search() {
    this.loading = true;
    this.panneService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.pannes = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.pannes)
        this.loading = false;
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  desactivate() {
    this.loading = true;
    this.panneService.desactivate(this.panne).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.panne = ret['response'];
        this.pannes.forEach(p => {
          if(this.panne.id === p.id){
            p.enabled = this.panne.enabled;
          }
        });
        this.toast.success(ret['message']);
        this.loading = false;
        this.openConfirmDialog.nativeElement.click();
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      // console.log('erreur server');
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  activate() {
    this.loading = true;
    this.panneService.activate(this.panne).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.panne = ret['response'];
        this.pannes.forEach(p => {
          if(this.panne.id === p.id){
            p.enabled = this.panne.enabled;
          }
        });
        this.toast.success(ret['message']);
        this.loading = false;
        this.openConfirmDialog.nativeElement.click();
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      // console.log('erreur server');
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }
}

