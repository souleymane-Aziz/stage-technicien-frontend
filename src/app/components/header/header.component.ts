import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { AppToastService } from 'src/app/shared/utils/AppToast.service';
import { MyMatDialogConfig } from 'src/app/shared/utils/mat-dialog-config';
import { SearchParam } from 'src/app/shared/utils/search-param';
import { environment } from 'src/environments/environment';
import { RoleManager } from 'src/app/shared/utils/role-manager';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { strings as englishShortStrings } from 'ngx-timeago/language-strings/en-short';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';
import { strings as frenchShortStrings } from 'ngx-timeago/language-strings/fr-short';
import * as SecureLS from 'secure-ls';
import { Materiel } from 'src/app/shared/models/materiel';
import { MaterielService } from 'src/app/admin/services/materiel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: Utilisateur;
  public searchParam: SearchParam;
  public roleManager: RoleManager;
  public isExpanded: boolean = true;
  public urlDeBase: string;
  public checkVueNotification: boolean = true;
  public lang = 'fr-short';
  public materiels: Materiel[] = []
  @ViewChild('openLogoutDialog') openLogoutDialog: any;

  constructor(
    private authService: AuthService,
    private materielService: MaterielService,
    private toast: AppToastService,
    private appConfig: AppConfig,
    private router: Router,
    public dialog: MatDialog,
    private matDialogConfig: MyMatDialogConfig,
    private intl: TimeagoIntl
  ) {
    this.currentUser = this.appConfig.currentUser;
    this.roleManager = new RoleManager();
    this.urlDeBase = environment.apiUrl +'/profileImage/'
    this.setLang(this.lang);
  }

  ngOnInit(): void {
    this.initNotifications();
  }

  public logout() {
    this.authService.logout(this.currentUser.id).subscribe(
      (ret) => {
        if (ret['status'] === 'OK') {
          localStorage.removeItem('current_session_app');
          this.openLogoutDialog.nativeElement.click();
          window.location.reload();
          this.router.navigate(['/login']);
        } else {
          this.toast.error(ret['message']);
        }
      },
      (error) => {
        console.log('error====>', error);
        this.toast.error(environment.erreur_connexion_message);
      }
    );
  }

  showLogoutDialog() {
    this.openLogoutDialog.nativeElement.click();
  }

  showChangePasswordDialog(): void {
    let userId = this.currentUser.id;
    const dialogConfig = this.matDialogConfig.config({
      userId,
    });
    dialogConfig.width = '25%';
    const dialogRef = this.dialog.open(
      ChangePasswordDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result === 'valider') {
        localStorage.removeItem('current_session_app');
        const ls = new SecureLS({ encodingType: 'aes', encryptionSecret: 'current_session_app2022' });
        ls.remove('current_session_app');
        window.location.reload();
        this.router.navigate(['/login']);
      }
    });
  }
  /* --------notification--------------- */
  setLang(lang: string) {
    this.lang = lang;
    switch (lang) {
      case 'en': this.intl.strings = englishStrings; break;
      case 'en-short': this.intl.strings = englishShortStrings; break;
      case 'fr': this.intl.strings = frenchStrings; break;
      case 'fr-short': this.intl.strings = frenchShortStrings; break;
      default: break;
    }
    this.intl.changes.next();
  }

  public initNotifications() {
    const param = new SearchParam();
    param.dateDebut = new Date();
    var date = new Date();
    date.setDate(date.getDate() + 1);
    param.dateFin = date;
    param.criteria = '1';
      this.materielService.search(param).subscribe(ret => {
        if (ret['status'] === 'OK') {
          this.materiels = ret['response'];
        } else {
          this.toast.error(ret['message']);
        }
      }, error => {
        this.toast.error(environment.erreur_connexion_message);
      });
  }

  lowerFirstLetter(textToLower) {
    return textToLower.charAt(0).toLowerCase() + textToLower.slice(1);
  }

  public getShortMessage(message: string) {
    if (message && message.length > 130) {
      return message.substring(0, 130) + ' ....';
    }
    return message;
  }

  public setNotificationRead(notification) {
  }

  /* ----------------/notification--------------- */

  /* ---------------collapse sidebar-------------- */
  openSidebar() {
    var sidebbar = document.getElementById("sidebar");
    sidebbar.style.width = "120%";
  }

  onCollapseSidebar() {
    if (this.isExpanded) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    var headerLeft = document.getElementById('header-left');
    var headerRight = document.getElementById('header-right');
    var logoApp = document.getElementById('logo-app');
    if (this.isExpanded) {
      sidebar.classList.remove('sidebar', 'collapsed', 'sidebar-offcanvas');
      sidebar.classList.add('sidebar', 'sidebar-offcanvas');
      sidebar.style.width = "215px";
      headerRight.classList.remove('header-right');
      logoApp.style.width = "48px";
      logoApp.style.height = "48px";
      headerLeft.style.width = "215px";
      mainContent.classList.remove('main-collapsed');
      mainContent.classList.add('main-expanded');
      return;
    }
    mainContent.classList.add('main-collapsed');
    mainContent.classList.remove('main-expanded');
    headerRight.classList.add('header-right');
    headerLeft.style.width = "55px";
    logoApp.style.width = "30px";
    logoApp.style.height = "30px";
    sidebar.style.width = "55px";
    sidebar.classList.remove('sidebar', 'sidebar-offcanvas');
    sidebar.classList.add('sidebar', 'collapsed', 'sidebar-offcanvas');
  }
}
