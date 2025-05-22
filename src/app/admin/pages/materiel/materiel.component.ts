import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Affectation } from 'src/app/shared/models/affectation';
import { Materiel } from 'src/app/shared/models/materiel';
import { MaterielExportModel } from 'src/app/shared/models/materiel-model';
import { TypeMateriel } from 'src/app/shared/models/type-materiel';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { ExcelService } from '../../services/excel.service';
import { MaterielService } from '../../services/materiel.service';
import { TypeMaterielService } from '../../services/type-materiel.service';
import { AffectationDialogComponent } from '../dialogs/affectation-dialog/affectation-dialog.component';
import { MaterielDialogComponent } from '../dialogs/materiel-dialog/materiel-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {
  
  public materiel: Materiel;
  public materiels: Materiel[] = [];
  public affectation: Affectation;
  public affectations: Affectation[] = [];
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  public clientFilter = { nomComplet: '' };
  public loading: boolean;
  public currentPage = 'list';
  public pageTitle = 'Liste';
  public dialogAction: string;
  public dataLength: number = 0;
  public isExcelFile: boolean;
  public currentUser: Utilisateur;
  displayedColumns: string[] = ['nom', 'modele', 'marque', 'dateacqui','adressemac', 'caracteristique','option'];
  dataSource: MatTableDataSource<Materiel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openCreatedDialog') openCreatedDialog: any;
  @ViewChild('inputFile') inputFile: ElementRef;
  public typeMateriel: TypeMateriel;
  public typeMateriels: TypeMateriel[] = [];
  public typeMaterielFilter = { libelle: '' };
  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private materielService: MaterielService,
    private typeMaterielService: TypeMaterielService,
    private toast: AppToastService,
    private excelService: ExcelService,
    private dateAdapter: DateAdapter<Date>,
    private appConfig: AppConfig
  ) {
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new AppUtil().getSearchParam();
    this.dateAdapter.setLocale('fr-FR');
    this.materiels = [];
  }

  ngOnInit() {
    this.searchParam.dateDebut = new Date();
    this.searchParam.dateFin = new Date();
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 7);
    this.searchParam.criteria = '1';
  }

  showList() {
    this.currentPage = 'list';
    this.pageTitle = 'Liste'
  }

  showAddDialog(): void {
    this.materiel = new Materiel();
    this.initTypeMateriels();
    this.currentPage = 'add';
    this.pageTitle = 'Nouvelle materielle';
  }
  private initDataTable(materiels: Materiel[]) {
    this.dataSource = new MatTableDataSource(materiels);
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

  showConfirmDialog(c: Materiel, action: string) {
    this.materiel = c
    this.dialogAction = action
    const dialogConfig = this.matDialogConfig.config({
      materiel: this.materiel,
      isAttente: false,
      dialogAction: this.dialogAction
    });
    dialogConfig.width = '24%';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.materiel = result;
        this.materiels.forEach(p => {
          if(result.id === p.id){
            p.enabled = this.materiel.enabled;
          }
        });
        this.initDataTable(this.materiels);
      }
    });
  }

  showAddDialog1(): void {
    this.materiel = new Materiel();
    const dialogConfig = this.matDialogConfig.config({
      materiel: this.materiel,
    });
    dialogConfig.width = '33%';
    const dialogRef = this.dialog.open(MaterielDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.materiel = result;
        this.materiels.push(this.materiel);
        this.initDataTable(this.materiels);

      }
    });
  }
  showAddAffectationDialog(materiel: Materiel): void {
    this.materiel = this.materiel;
    console.log("====== materiel 1=======", this.materiel)
    this.affectation = new Affectation();
    this.affectation.materiel= materiel
    this.affectation.employe
    console.log("====== materiel =======", this.materiel)
    console.log("====== affectation =======",this.affectation.materiel)
    const dialogConfig = this.matDialogConfig.config({
      affectation: this.affectation, materiel: materiel
    });
    dialogConfig.width = '25%';
    console.log("====== materiel 3=======", this.materiel)
    const dialogRef = this.dialog.open(AffectationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.materiel = result;
        this.materiels.push(this.materiel);
        console.log("====== affectation =======", this.affectation)

        this.initDataTable(this.materiels);

      }
    });
  }
  showEditDialog(materiel: Materiel): void {
    const dialogConfig = this.matDialogConfig.config({
      materiel: materiel,
    });
    dialogConfig.width = '33%';
    const dialogRef = this.dialog.open(MaterielDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.materiel = result;
        this.initDataTable(this.materiels);
      }
    });
  }

  showDetail(materiel: Materiel) {
    this.materiel = materiel;
    this.currentPage = 'detail';
    this.pageTitle = 'Détails materiel'
  }


  initTypeMateriels() {
    const param = new SearchParam();
    param.criteria = '2';
    this.typeMaterielService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.typeMateriels = ret['response'];
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
  search() {
    this.loading = true;
    this.searchParam.attente = false;
    this.materielService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.materiels = ret['response'];
        this.initDataTable(this.materiels)
        this.toast.info(ret['message']);
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
  onChangeCritere() {
    if(this.searchParam.criteria === '5') {
      //this.initClients();
    }
  }
  save() {
    console.log('======= materiel======', this.materiel)
    this.loading = true;
    if (this.materiel.id) {
      this.materielService.update(this.materiel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.materiel = ret['response'];
          this.showList();
          //this.dialogRef.close(this.materiel);
          this.loading = false;
          this.toast.success(ret['message']);
        } else {
          this.loading = false;
          this.toast.error(ret['message']);
        }
      }, error => {
        this.toast.error(environment.erreur_connexion_message);
        this.loading = false;
      });
    } else {
      this.materiel.utilisateur = this.currentUser;
      this.materielService.save(this.materiel).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.materiel = ret['response'];
          this.showList();
         // this.dialogRef.close(this.materiel);
          this.loading = false;
          this.toast.success(ret['message']);
        } else {
          this.loading = false;
          this.toast.error(ret['message']);
        }
      }, error => {
        this.toast.error(environment.erreur_connexion_message);
        this.loading = false;
      });
    }
  }



  exportToExcel() {
    let mats = []
    this.materiels.forEach(mat => {
      let exportModel = new MaterielExportModel();
      exportModel.Nom = mat.nom;
      exportModel.Marque = mat.marque;
      exportModel.Modele = mat.modele;
          let mats = []
.push(exportModel);
    });
   // this.excelService.exportAsExcelFile( let mats = [], 'materiels')
  }
}
