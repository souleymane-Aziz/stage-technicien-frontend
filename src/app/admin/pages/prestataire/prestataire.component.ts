import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prestataire } from 'src/app/shared/models/prestataire';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { PrestataireService } from '../../services/prestataire.service';
import { PrestataireDialogComponent } from '../dialogs/prestataire-dialog/prestataire-dialog.component';

@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css']
})
export class PrestataireComponent implements OnInit {
  public prestataire: Prestataire;
  public prestataires: Prestataire[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'adresse', 'email', 'etat', 'option'];
  dataSource: MatTableDataSource<Prestataire>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;
  
  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private prestataireService: PrestataireService,
    private toast: AppToastService,
    private appConfig: AppConfig
  ) {
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new SearchParam();
  }
  
  ngOnInit() {
    this.searchParam.criteria = '2';
    this.searchParam.dateDebut = new Date();
    this.searchParam.dateFin = new Date();
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 1);
  }

  private initDataTable(prestataires: Prestataire[]) {
    console.log("+++++++++++données+++++++++++++",prestataires)
    this.dataSource = new MatTableDataSource(prestataires);
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
    this.prestataire = new Prestataire();
    const dialogConfig = this.matDialogConfig.config({
      prestataire: this.prestataire
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(PrestataireDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.prestataire = result;
        this.prestataires.push(this.prestataire);
        this.initDataTable(this.prestataires);

      }
    });
  }

  showEditDialog(prestataire: Prestataire): void {
    const dialogConfig = this.matDialogConfig.config({
      prestataire: prestataire
    
    });
    console.log('le nom modifier est :',prestataire);
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(PrestataireDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.prestataire = result;
        this.initDataTable(this.prestataires);
      }
    });
  }

  showConfirmDialog(prestataire: Prestataire, action: string): void {
    this.dialogAction = action;
    this.prestataire = prestataire;
    this.openConfirmDialog.nativeElement.click();
  }

  search() { 
    this.loading = true;
    this.prestataireService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.prestataires = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.prestataires)
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
    this.prestataireService.desactivate(this.prestataire).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.prestataire = ret['response'];
        this.prestataires.forEach(p => {
          if(this.prestataire.id === p.id){
            p.enabled = this.prestataire.enabled;
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
    this.prestataireService.activate(this.prestataire).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.prestataire = ret['response'];
        this.prestataires.forEach(p => {
          if(this.prestataire.id === p.id){
            p.enabled = this.prestataire.enabled;
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

