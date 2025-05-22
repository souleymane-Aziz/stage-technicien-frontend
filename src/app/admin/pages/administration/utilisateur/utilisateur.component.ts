import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileService } from 'src/app/admin/services/profile.service';
import { UtilisateurService } from 'src/app/admin/services/utilisateur.service';
import { Profile } from 'src/app/shared/models/profile';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { PaginatorConfig } from 'src/app/shared/utils/paginator-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { ReinitialiserDialogComponent } from './reinitialiser-dialog/reinitialiser-dialog.component';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  public utilisateurs: Utilisateur[] = [];
  public utilisateur: Utilisateur = new Utilisateur();
  public profiles: Profile[] = [];
  public roleManager: RoleManager;
  public searchParam: SearchParam;
  public currentUser: any;
  public loading: boolean;
  public pageTitle = 'Liste';
  public currentPage = 'list';
  public dialogAction: string;
  public imageProfile: string;
  public profileFilter = { nom: '' };
  public cadtFilter = { nom: '' };
  public daaraFilter = { nom: '' };
  public urlDeBase: string;

  displayedColumns = [
    'prenom',
    'nom',
    'telephone',
    'username',
    'profile',
    'etat',
    'action',
  ];
  dataSource: MatTableDataSource<Utilisateur>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;
  @ViewChild('fileInputUpload', { static: false }) fileInputUpload: ElementRef;

  constructor(
    private matDialogConfig: MyMatDialogConfig,
    public dialog: MatDialog,
    private utilisateurService: UtilisateurService,
    private profileService: ProfileService,
    private toast: AppToastService,
    private appConfig: AppConfig
  ) {
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.searchParam = new SearchParam();
    this.urlDeBase = environment.apiUrl +'/profileImage/'
  }

  ngOnInit() {
    this.utilisateurs= [];
    this.searchParam.criteria = '1';
    this.initDataTable(this.utilisateurs);
  }
  private initDataTable(utilisateurs: Utilisateur[]) {
    this.dataSource = new MatTableDataSource(utilisateurs);
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

  showAddForm() {
    this.utilisateur = new Utilisateur();
    this.imageProfile = null;
    this.findProfiles();
    this.currentPage = 'add';
    this.pageTitle = 'Nouveau Utilisateur';
  }

  showEditForm(user: Utilisateur) {
    this.utilisateur = user;
    this.findProfiles();
    if(this.utilisateur.imageName){
      this.imageProfile = this.urlDeBase+user.imageName;
    }
    this.currentPage = 'edit';
    this.pageTitle = 'Modification d\'Utilisateur';
  }

  showDetail(user: Utilisateur) {
    this.utilisateur = user;
    this.currentPage = 'detail';
    this.pageTitle = 'Détails user'
  }

  showReinitialiserDialog(utilisateur: Utilisateur): void {
    const dialogConfig = this.matDialogConfig.config({
      utilisateur: utilisateur
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(ReinitialiserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result === 'valider') {}
    });
  }

  showConfirmDialog(utilisateur: Utilisateur, action: string): void {
    this.dialogAction = action;
    this.utilisateur = utilisateur;
    this.openConfirmDialog.nativeElement.click();
  }

  findUtilisateur() {
    this.loading = true;
    this.utilisateurService.search(this.searchParam).subscribe(
      (ret) => {
        if (ret) {
          if (ret['status'] == 'OK') {
            this.utilisateurs = ret['response'];
            this.initDataTable(this.utilisateurs);
            //this.showDetail(this.utilisateurs[1]);
            this.loading = false;
            this.toast.info(ret['message']);
          } else {
            this.toast.error(ret['message']);
            this.loading = false;
          }
        } else {
          this.toast.error('Problème de connexion au serveur');
          this.loading = false;
        }
      },
      () => {
        this.toast.error('Problème de connexion');
        this.loading = false;
      }
    );
  }

  save() {
    if (this.utilisateur.password !== this.utilisateur.oldPassword) {
      this.toast.warning('Confirmation de mot de passe incorrecte')
      return
    }
    this.loading = true;
    this.utilisateur.imageData = this.imageProfile;
    this.utilisateurService.save(this.utilisateur).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.utilisateur = ret['response'];
        this.utilisateurs.push(this.utilisateur)
        this.initDataTable(this.utilisateurs)
        this.toast.success(ret['message']);
        this.loading = false;
        this.showList()
      } else {
        this.loading = false;
        this.toast.error(ret['message']);
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  update() {
    this.loading = true;
    this.utilisateur.imageData = this.imageProfile;
    this.utilisateurService.update(this.utilisateur).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.utilisateur = ret['response'];
        this.toast.success(ret['message']);
        this.loading = false;
        this.showList()
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  desactivateOrActivate() {
    this.loading = true;
    this.utilisateurService.desactivateOrActivate(this.utilisateur).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.utilisateur = ret['response'];
        this.utilisateurs.forEach(user => {
          if(user.id === this.utilisateur.id){
            user.enabled = this.utilisateur.enabled;
          }
        });
        this.openConfirmDialog.nativeElement.click();
        this.toast.success(ret['message']);
        this.loading = false;
        this.showList()
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  findProfiles() {
    const search = new SearchParam()
    search.criteria = '1'
    search.enabled = true
    this.profileService.search(search).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.profiles = ret['response'];
        if (this.currentPage === 'edit' || this.currentPage === 'detail' && this.utilisateur.profile && this.profiles.length > 0) {
          this.utilisateur.profile = this.profiles.find(p => p.id === this.utilisateur.profile.id)
        }
        this.loading = false;
      } else {
        this.toast.error('problème de chargement des profiles');
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  /* *********************Upload Photo************** */
  selectPicture() {
    this.fileInputUpload.nativeElement.click();
  }
  deleteImageProfile() {
    this.imageProfile = null;
  }
  onFileUploadChange(event) {
    if (event.target.files.length <= 0) {
      return;
    }
    let file = event.target.files[0];
    if (!file.type.includes("image")) {
      this.toast.info("Veuilez choisir une image!");
      return;
    }
    if ((file.size / 1024) > 1024 * 1024 * 5) {
      this.toast.info("La taille à dépasser 5 Mo");
      return;
    }
    let reader = new FileReader();
    reader.onload = readerEvent => {
      this.imageProfile = (readerEvent.target as any).result;
      //piece.pieceUrl = readerEvent.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
