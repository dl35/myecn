import { PiscinesComponent } from './piscines.component';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule
  ],
  declarations: [PiscinesComponent]
})
export class PiscinesModule { }
