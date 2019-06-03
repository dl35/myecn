import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LicenciesRoutingModule } from './licencies-routing.module';
import { LicenciesComponent } from './licencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from '../material/MomentUtcDateAdapter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    LicenciesRoutingModule
  ],
  declarations: [LicenciesComponent, EditComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentUtcDateAdapter}
  ],
})
export class LicenciesModule { }
