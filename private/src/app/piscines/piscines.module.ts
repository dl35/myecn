import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiscinesComponent } from './piscines.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LeafletModule,
    FlexLayoutModule,
  ],
  declarations: [PiscinesComponent]
})
export class PiscinesModule { }
