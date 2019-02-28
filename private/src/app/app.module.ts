import { DialogEngageComponent } from './engagements/dialog-engage/dialog-engage.component';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { EngagementsModule } from './engagements/engagements.module';
import { PiscinesModule } from './piscines/piscines.module';
import { RecordsModule } from './records/records.module';
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

import 'hammerjs';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';


import { QuillModule } from 'ngx-quill';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MomentUtcDateAdapter } from './material/MomentUtcDateAdapter';
import { HttpConfigInterceptor } from './interceptor/HttpConfigInterceptor';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DialogConfirmComponent
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
    RecordsModule,
    PiscinesModule,
    AppRoutingModule,
    MatMomentDateModule
  ],
  entryComponents: [DialogConfirmComponent, DialogEngageComponent],
  providers: [AuthGuard ,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LOCALE_ID, useValue: 'fr' } ,
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
],

  bootstrap: [AppComponent]
})
export class AppModule { }
