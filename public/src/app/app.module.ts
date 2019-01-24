import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { EngagementsModule } from './engagements/engagements.module';
import { RecordsModule } from './records/records.module';
import { PiscinesModule } from './piscines/piscines.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { StatsModule } from './stats/stats.module';
import { AdhesionModule } from './adhesion/adhesion.module';




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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
