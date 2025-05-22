import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { AppConfig } from 'src/app/shared/utils/app-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.css']
})
export class DetailProfilComponent implements OnInit {
  public currentPage: string = 'list';
  public currentUser: Utilisateur;
  public urlDeBase: string;

  constructor(private appConfig: AppConfig) {
    this.currentUser = this.appConfig.currentUser;
    this.urlDeBase = environment.apiUrl +'/profileImage/'
  }

  ngOnInit(): void {
  }

}
