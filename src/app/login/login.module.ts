import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#40a83d',
      secondaryColour: '#338f91',
      tertiaryColour: '#2e86b4',
      fullScreenBackdrop:true,
    }),
  ]
})
export class LoginModule { }
