
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { EngagementsModule } from './engagements/engagements.module';
import { RecordsModule } from './records/records.module';
import { PiscinesModule } from './piscines/piscines.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { StatsModule } from './stats/stats.module';
import { AdhesionModule } from './adhesion/adhesion.module';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import localeFr from '@angular/common/locales/fr';
import { MomentUtcDateAdapter } from './material/MomentUtcDateAdapter';


registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatMomentDateModule,
    EngagementsModule,
    PiscinesModule,
    RecordsModule,
    CompetitionsModule,
    StatsModule,
    AdhesionModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LOCALE_ID, useValue: 'fr' } ,
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentUtcDateAdapter }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
