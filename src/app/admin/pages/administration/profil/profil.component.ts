import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DroitService } from 'src/app/admin/services/droit.service';
import { ProfileService } from 'src/app/admin/services/profile.service';
import { Droit } from 'src/app/shared/models/droit';
import { Profile } from 'src/app/shared/models/profile';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { PaginatorConfig } from 'src/app/shared/utils/paginator-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profile: Profile;
  profiles: Profile[];
  droits: Droit[];
  roleManager: RoleManager;
  searchParam: SearchParam;
  droitFilter: { description: '' }
  loading: boolean;
  currentPage = 'list'
  pageTitle = 'Liste'
  dialogAction: string
  isSelectedRole: boolean;

  displayedColumns = ['nom', 'description', 'etat', 'options'];
  dataSource: MatTableDataSource<Profile>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('openConfirmDialog') openConfirmDialog: any;

  constructor(
    private profileService: ProfileService,
    private droitService: DroitService,
    private toast: AppToastService) {
    this.searchParam = new AppUtil().getSearchParam();
    this.roleManager = new RoleManager();
  }

  ngOnInit() {
    this.profiles = []
    this.dialogAction = ''
    this.initDataTable(this.profiles)
    this.searchParam.criteria = '1';
    this.droitFilter = { description: '' }
    //this.search()
  }

  private initDataTable(profiles: Profile[]) {
    this.dataSource = new MatTableDataSource(profiles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    this.loading = true;
    this.profileService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.profiles = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.profiles)
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  save() {
    if (this.droits) {
      this.profile.droits = []
      this.droits.forEach(d => {
        if (d.checked !== undefined && d.checked) {
          this.profile.droits.push(d)
        }
      })
    }
    if (this.profile.droits.length === 0) {
      this.toast.warning('Veuillez selectionner au moins 1 droit');
      return
    }
    this.loading = true;
    this.profileService.save(this.profile).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.profile = ret['response'];
        this.profiles.push(this.profile)
        this.initDataTable(this.profiles)
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
    if (this.droits) {
      this.profile.droits = []
      this.droits.forEach(d => {
        if (d.checked !== undefined && d.checked) {
          this.profile.droits.push(d)
        }
      })
    }
    if (this.profile.droits.length === 0) {
      this.toast.warning('Veuillez selectionner au moins 1 droit');
      return
    }
    this.loading = true;
    this.profileService.update(this.profile).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.profile = ret['response'];
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

  activateOrDesactivate() {
    this.loading = true;
    this.profileService.activateOrDesactivate(this.profile).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.profile = ret['response'];
        this.profiles.forEach(p => {
          if(this.profile.id === p.id){
            p.etat = this.profile.etat
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

  showList() {
    this.currentPage = 'list';
    this.pageTitle = 'Liste'
  }

  showAddForm() {
    this.currentPage = 'add';
    this.pageTitle = 'Nouveau profil'
    this.profile = new Profile()
    this.findDroits()
  }

  showEditForm(p: Profile) {
    this.profile = p;
    this.loading = true;
    this.profileService.findDroitForProfil(this.profile).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.droits = ret['response']['targetList'];
        this.droits.forEach(d => { d.checked = true })
        const otherRights = ret['response']['sourceList']
        otherRights.forEach(or => { this.droits.push(or) })
        this.loading = false;
        this.currentPage = 'edit'
        this.pageTitle = 'Modification'
      } else {
        this.toast.error(ret['message']);
        this.loading = false;
      }
    }, error => {
      // console.log('erreur server');
      this.toast.info(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  showConfirmDialog(p: Profile, action: string) {
    this.profile = p
    this.dialogAction = action
    this.openConfirmDialog.nativeElement.click();
  }

  /**
   * Others methodes
   */
  findDroits() {
    this.loading = true;
    this.droitService.findAll().subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.droits = ret['response'];
        this.loading = false;
        // this.droitsToDisplay = this.droits.map(p => (p.checked = false, p));
      } else {
        this.toast.error(['message']);
        this.loading = false;
      }
    }, error => {
      this.toast.error(environment.erreur_connexion_message);
      this.loading = false;
    });
  }

  // check or uncheck roles
  checkedAllRole() {
    this.droits.forEach(r => {
      r.checked = this.isSelectedRole;
    });
  }

}
