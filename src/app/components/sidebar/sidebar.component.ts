import { Component, OnInit } from '@angular/core';
import { RoleManager } from 'src/app/shared/utils/role-manager';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public roleManager: RoleManager;

  constructor() {
    this.roleManager = new RoleManager();
   }

  ngOnInit(): void {
  }

  closeSidebar() {
    document.getElementById("sidebar").style.width = "0%";
  }
}
