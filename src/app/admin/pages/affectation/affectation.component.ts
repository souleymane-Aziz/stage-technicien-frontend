import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Affectation } from 'src/app/shared/models/affectation';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { AffectationService } from '../../services/affectation.service';
import { AffectationDialogComponent } from '../dialogs/affectation-dialog/affectation-dialog.component';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  public affectation: Affectation;
  public affectations: Affectation[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  displayedColumns: string[] = ['date_debut', 'date_fin','option'];
  dataSource: MatTableDataSource<Affectation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private affectationService: AffectationService,
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
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 1);
  }

  private initDataTable(affectations: Affectation[]) {
    this.dataSource = new MatTableDataSource(affectations);
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
    this.affectation = new Affectation();
    const dialogConfig = this.matDialogConfig.config({
      affectation: this.affectation
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(AffectationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.affectation = result;
        this.affectations.push(this.affectation);
        this.initDataTable(this.affectations);

      }
    });
  }

  showEditDialog(affectation: Affectation): void {
    const dialogConfig = this.matDialogConfig.config({
      affectation: affectation
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(AffectationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.affectation = result;
        this.initDataTable(this.affectations);
      }
    });
  }

  showConfirmDialog(affectation: Affectation, action: string): void {
    this.dialogAction = action;
    this.affectation = affectation;
    this.openConfirmDialog.nativeElement.click();
  }

  search() {
    this.loading = true;
    this.affectationService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.affectations = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.affectations)
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
    this.affectationService.desactivate(this.affectation).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.affectation = ret['response'];
        this.affectations.forEach(p => {
          if(this.affectation.id === p.id){
            p.enabled = this.affectation.enabled;
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
    this.affectationService.activate(this.affectation).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.affectation = ret['response'];
        this.affectations.forEach(p => {
          if(this.affectation.id === p.id){
            p.enabled = this.affectation.enabled;
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