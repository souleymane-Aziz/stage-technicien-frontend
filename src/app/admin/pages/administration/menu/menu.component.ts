import { Component, OnInit } from '@angular/core';
import { RoleManager } from 'src/app/shared/utils/role-manager';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public roleManager: RoleManager;
  constructor() {
    this.roleManager = new RoleManager();
   }

  ngOnInit(): void {
  }

}
