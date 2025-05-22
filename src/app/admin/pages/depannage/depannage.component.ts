import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Depannage } from 'src/app/shared/models/depannage';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { DepannageService } from '../../services/depannage.service';
import { DepannageDialogComponent } from '../dialogs/depannage-dialog/depannage-dialog.component';

@Component({
  selector: 'app-depannage',
  templateUrl: './depannage.component.html',
  styleUrls: ['./depannage.component.css']
})
export class DepannageComponent implements OnInit {

  public depannage: Depannage;
  public depannages: Depannage[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  displayedColumns: string[] = ['type', 'datedebut', 'datefin', 'frais', 'option'];
  dataSource: MatTableDataSource<Depannage>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private depannageService: DepannageService,
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

  private initDataTable(depannages: Depannage[]) {
    this.dataSource = new MatTableDataSource(depannages);
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
    this.depannage = new Depannage();
    const dialogConfig = this.matDialogConfig.config({
      depannage: this.depannage
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(DepannageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.depannage = result;
        this.depannages.push(this.depannage);
        this.initDataTable(this.depannages);

      }
    });
  }

  showEditDialog(depannage: Depannage): void {
    const dialogConfig = this.matDialogConfig.config({
      depannage: depannage
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(DepannageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.depannage = result;
        this.initDataTable(this.depannages);
      }
    });
  }

  showConfirmDialog(depannage: Depannage, action: string): void {
    this.dialogAction = action;
    this.depannage = depannage;
    this.openConfirmDialog.nativeElement.click();
  }

  search() {
    this.loading = true;
    this.depannageService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.depannages = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.depannages)
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
    this.depannageService.desactivate(this.depannage).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.depannage = ret['response'];
        this.depannages.forEach(p => {
          if(this.depannage.id === p.id){
            p.enabled = this.depannage.enabled;
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
    this.depannageService.activate(this.depannage).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.depannage = ret['response'];
        this.depannages.forEach(p => {
          if(this.depannage.id === p.id){
            p.enabled = this.depannage.enabled;
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

