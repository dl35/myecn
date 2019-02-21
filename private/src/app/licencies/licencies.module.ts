import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LicenciesRoutingModule } from './licencies-routing.module';
import { LicenciesComponent } from './licencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    LicenciesRoutingModule
  ],
  declarations: [LicenciesComponent, EditComponent]
})
export class LicenciesModule { }
