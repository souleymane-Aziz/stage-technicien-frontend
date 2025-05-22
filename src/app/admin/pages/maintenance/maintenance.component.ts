import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Maintenance } from 'src/app/shared/models/maintenance';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  public maintenance: Maintenance;
  public maintenances: Maintenance[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;

  displayedColumns = ['status', 'dateCreation', 'etat', 'action'];
  dataSource: MatTableDataSource<Maintenance>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private maintenanceService: MaintenanceService,
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

  private initDataTable(maintenances: Maintenance[]) {
    this.dataSource = new MatTableDataSource(maintenances);
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
    this.maintenance = new Maintenance();
    const dialogConfig = this.matDialogConfig.config({
      maintenance: this.maintenance
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(MaintenanceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.maintenance = result;
        this.maintenances.push(this.maintenance);
        this.initDataTable(this.maintenances);

      }
    });
  }

  showEditDialog(maintenance: Maintenance): void {
    const dialogConfig = this.matDialogConfig.config({
      maintenance: maintenance
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(MaintenanceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.maintenance = result;
        this.initDataTable(this.maintenances);
      }
    });
  }

  showConfirmDialog(maintenance: Maintenance, action: string): void {
    this.dialogAction = action;
    this.maintenance = maintenance;
    this.openConfirmDialog.nativeElement.click();
  }

  search() {
    this.loading = true;
    this.maintenanceService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.maintenances = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.maintenances)
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
    this.maintenanceService.desactivate(this.maintenance).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.maintenance = ret['response'];
        this.maintenances.forEach(p => {
          if(this.maintenance.id === p.id){
            p.enabled = this.maintenance.enabled;
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
    this.maintenanceService.activate(this.maintenance).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.maintenance = ret['response'];
        this.maintenances.forEach(p => {
          if(this.maintenance.id === p.id){
            p.enabled = this.maintenance.enabled;
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
