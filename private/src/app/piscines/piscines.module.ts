import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PiscinesComponent } from './piscines.component';
import { PiscinesRoutingModule } from './piscines-routing.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PiscinesRoutingModule
  ],
  declarations: [PiscinesComponent, EditComponent]
})
export class PiscinesModule { }
