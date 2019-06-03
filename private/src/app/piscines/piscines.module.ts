import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiscinesComponent } from './piscines.component';
import { PiscinesRoutingModule } from './piscines-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PiscinesRoutingModule
  ],
  declarations: [PiscinesComponent]
})
export class PiscinesModule { }
