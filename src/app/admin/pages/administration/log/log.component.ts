import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LogUserService } from 'src/app/admin/services/LogUser.service';
import { UtilisateurService } from 'src/app/admin/services/utilisateur.service';
import { LogUser } from 'src/app/shared/models/LogUser';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppUtil } from 'src/app/shared/utils/App-util';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { PaginatorConfig } from 'src/app/shared/utils/paginator-config';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public log: LogUser;
  public logs: LogUser[];
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  public utilisateurs: Utilisateur[] = [];
  public utilisateurFilter = { nomComplet: '' };
  public loading: boolean
  public currentPage = 'list'
  public pageTitle = 'Liste'

  displayedColumns = ['agent', 'action', 'description', 'dateLog',];
  dataSource: MatTableDataSource<LogUser>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("openDialog") openDialog: any;

  constructor(
    private logService: LogUserService,
    private utilisateurService: UtilisateurService,
    private toast: AppToastService,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.roleManager = new RoleManager();
    this.searchParam = new AppUtil().getSearchParam();
    this.dateAdapter.setLocale('fr-FR');
    this.logs = [];
  }

  ngOnInit() {
    this.searchParam.criteria = '1';
    this.searchParam.dateDebut = new Date();
    this.searchParam.dateFin = new Date();
    this.searchParam.dateDebut.setDate(this.searchParam.dateDebut.getDate() - 1);
  }

  private initDataTable(logs: LogUser[]) {
    this.dataSource = new MatTableDataSource(logs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangeCritere() {
    if(this.searchParam.criteria === '3') {
      this.initUtilisateurs();
    }
  }

  search() {
    this.loading = true;
    this.logService.search(this.searchParam).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.logs = ret['response'];
        this.toast.info(ret['message']);
        this.initDataTable(this.logs)
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

  initUtilisateurs() {
    const param = new SearchParam();
    param.criteria = '1';
    this.utilisateurService.search(param).subscribe(ret => {
      if (ret['status'] === 'OK') {
        this.utilisateurs = ret['response'];
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
}
