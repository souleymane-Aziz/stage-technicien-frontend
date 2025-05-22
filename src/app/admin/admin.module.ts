import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { Observable, of } from 'rxjs';
import { expand, delay, skip } from 'rxjs/operators';import { DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ChangePasswordDialogComponent } from '../components/change-password-dialog/change-password-dialog.component';
import { MaterialModule } from '../shared/modules/material.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ContratsComponent } from './pages/contrats/contrats.component';
import { ContratsDialogComponent } from './pages/dialogs/contrats-dialog/contrats-dialog.component';
import { CongeDialogComponent } from './pages/dialogs/conge-dialog/conge-dialog.component';
import { ContratsDialogs2Component } from './pages/dialogs/contrats-dialogs2/contrats-dialogs2.component';
import { CongeDialogs2Component } from './pages/dialogs/conge-dialogs2/conge-dialogs2.component';
import { ValiderCongeComponent } from './pages/dialogs/valider-conge/valider-conge.component';




export class MyClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return of(0)
      .pipe(
        expand(() => {
          const now = Date.now();
          const seconds = Math.round(Math.abs(now - then) / 1000);

          const period = seconds < 60 ? 1000 : 1000 * 60;

          return of(period).pipe(delay(period));
        }),
        skip(1)
      );
  }
}

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}
@NgModule({
  declarations: [
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ChangePasswordDialogComponent,
  
 
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgxLoadingModule,
    MaterialModule,
    FilterPipeModule,
    TimeagoModule.forRoot({
      clock: { provide: TimeagoClock, useClass: MyClock },
    }),
    TimeagoModule.forChild({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
    })
  ]
})
export class AdminModule { }
