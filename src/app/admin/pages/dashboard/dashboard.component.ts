import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Dashbard } from "src/app/shared/models/dashboard";
import { Utilisateur } from "src/app/shared/models/utilisateur";
import { AppConfig } from "src/app/shared/utils/app-config";
import { AppToastService } from "src/app/shared/utils/AppToast.service";
import { PaginatorConfig } from "src/app/shared/utils/paginator-config";
import { RoleManager } from "src/app/shared/utils/role-manager";
import { SearchParam } from "src/app/shared/utils/search-param";
import { environment } from "src/environments/environment";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  public dashboard: Dashbard;
  public currentUser: Utilisateur;
  public loading: boolean;
  public prestataires: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'adresse', 'email', 'etat'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dashboardService: DashboardService,
    private toast: AppToastService,
    appConfig: AppConfig
  ) {
    this.currentUser = appConfig.currentUser;
    this.searchParam = new SearchParam();
    this.roleManager = new RoleManager();
    this.dashboard = new Dashbard();
  }

  ngOnInit(): void {
    this.searchParam.dateDebut = new Date();
    this.searchParam.dateFin = new Date();
    this.searchParam.dateFin.setDate(
      this.searchParam.dateFin.getDate() + 1
    );
    this.initDashboad();
  }

  initDataTable(demandes: any[]) {
    this.dataSource = new MatTableDataSource(demandes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.paginator._intl.itemsPerPageLabel = PaginatorConfig("Opérations");
  }

  initDashboad() {
    this.loading = true;
    this.searchParam.query = this.currentUser.nomComplet;
    this.dashboardService.search(this.searchParam).subscribe(
      (ret) => {
        if (ret["status"] === "OK") {
          this.dashboard = new Dashbard();
          let response = ret["response"];
          this.dashboard.nombreMaintenance = response.nombreMaintenance;
          this.dashboard.nombrePanne = response.nombrePanne;
          this.dashboard.nombreMateriel = response.nombreMateriel;
          this.dashboard.nombreDepannage = response.nombreDepannage;
          this.prestataires = response.prestataires;
          this.initDataTable(this.prestataires);
          this.toast.info(ret["message"]);
          this.loading = false;
        } else {
          this.toast.error(ret["message"]);
          this.loading = false;
        }
      },
      (error) => {
        this.toast.error(environment.erreur_connexion_message);
        this.loading = false;
      }
    );
  }
}
