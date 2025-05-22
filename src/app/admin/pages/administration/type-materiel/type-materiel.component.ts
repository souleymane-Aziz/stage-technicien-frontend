import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TypeMaterielService } from 'src/app/admin/services/type-materiel.service';
import { TypeMateriel } from 'src/app/shared/models/type-materiel';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { TypeMaterielDialogComponent } from '../../dialogs/type-materiel-dialog/type-materiel-dialog.component';

@Component({
  selector: 'app-type-materiel',
  templateUrl: './type-materiel.component.html',
  styleUrls: ['./type-materiel.component.css']
})
export class TypeMaterielComponent implements OnInit {
  public typeMateriel: TypeMateriel;
  public typeMateriels: TypeMateriel[] = [];
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public currentUser: any;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  displayedColumns: string[] = ['numeroSerie', 'libelle', 'description', 'etat','dateCreation', 'option'];
  dataSource: MatTableDataSource<TypeMateriel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private typeMaterielService: TypeMaterielService,
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
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 7);
  }

  private initDataTable(typeMateriels: TypeMateriel[]) {
    this.dataSource = new MatTableDataSource(typeMateriels);
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
    this.typeMateriel = new TypeMateriel();
    const dialogConfig = this.matDialogConfig.config({
      typeMateriel: this.typeMateriel
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(TypeMaterielDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.typeMateriel = result;
        this.typeMateriels.push(this.typeMateriel);
        this.initDataTable(this.typeMateriels);

      }
    });
  }

  showEditDialog(typeMateriel: TypeMateriel): void {
    const dialogConfig = this.matDialogConfig.config({
      typeMateriel: typeMateriel
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(TypeMaterielDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.typeMateriel = result;
        this.initDataTable(this.typeMateriels);
      }
    });
  }

  showConfirmDialog(typeMateriel: TypeMateriel, action: string): void {
    this.dialogAction = action;
    this.typeMateriel = typeMateriel;
    this.openConfirmDialog.nativeElement.click();
  }

  search() {
    this.loading = true;
    this.typeMaterielService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.typeMateriels = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.typeMateriels)
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
    this.typeMaterielService.desactivate(this.typeMateriel).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.typeMateriel = ret['response'];
        this.typeMateriels.forEach(p => {
          if(this.typeMateriel.id === p.id){
            p.enabled = this.typeMateriel.enabled;
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
    this.typeMaterielService.activate(this.typeMateriel).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.typeMateriel = ret['response'];
        this.typeMateriels.forEach(p => {
          if(this.typeMateriel.id === p.id){
            p.enabled = this.typeMateriel.enabled;
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