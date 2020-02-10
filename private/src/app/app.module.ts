import { DialogEngageComponent } from './engagements/dialog-engage/dialog-engage.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { EngagementsModule } from './engagements/engagements.module';
import { MailtoModule } from './mailto/mailto.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/guard.guard';
import { MenuComponent } from './menu/menu.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


import { QuillModule } from 'ngx-quill';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MomentUtcDateAdapter } from './material/MomentUtcDateAdapter';
import { HttpConfigInterceptor } from './interceptor/HttpConfigInterceptor';
import { LogoComponent } from './logo/logo.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DialogConfirmComponent,
    LogoComponent

   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CompetitionsModule,
    EngagementsModule,
    MailtoModule,
    AppRoutingModule,
    MatMomentDateModule
  ],
  entryComponents: [DialogConfirmComponent, DialogEngageComponent],
  providers: [AuthGuard ,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LOCALE_ID, useValue: 'fr' } ,
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentUtcDateAdapter },
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
],

  bootstrap: [AppComponent]
})
export class AppModule { }
