import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LicenciesRoutingModule } from './licencies-routing.module';
import { LicenciesComponent } from './licencies.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LicenciesRoutingModule
  ],
  declarations: [LicenciesComponent]
})
export class LicenciesModule { }
