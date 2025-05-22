import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin/services/auth.service';
import { AuthUser } from '../shared/models/auth-user';
import * as SecureLS from 'secure-ls';
import { AppToastService } from '../shared/utils/AppToast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public currentUser: any;
  public authUser: AuthUser = new AuthUser()
  public hidden: boolean = true;
  public loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
  }

  toggleShow() {
    this.hidden = !this.hidden;
  }

  seConnecter() {
    this.loading = true;
    this.authService.loginUser(this.authUser).subscribe(
      (ret) => {
        if (ret) {
          if (ret['status'] === 'OK') {
            this.toast.success(ret['message']);
            const ls = new SecureLS({
              encodingType: 'aes',
              encryptionSecret: 'AdminAppManager',
            });
            ls.set('current_session_app', JSON.stringify(ret['response'].agent));
            this.router.navigate(['/admin/dashboard']);
            window.location.href = environment.appRoot + '/#/admin/dashboard';
            window.location.reload();
            this.loading = false;
          } else {
            this.toast.error(ret['message']);
            this.loading = false;
          }
        } else {
          this.toast.error('Problème de connexion au serveur');
          this.loading = false;
        }
      },
      (error) => {
        this.toast.error('Problème de connexion');
        this.loading = false;
      }
    );
  }
}
