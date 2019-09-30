import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PiscinesComponent } from './piscines.component';
import { PiscinesRoutingModule } from './piscines-routing.module';
import { EditComponent } from './edit/edit.component';
import { PopupComponent } from './popup/popup.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PiscinesRoutingModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule
  ],
  entryComponents: [
    PopupComponent
],
  declarations: [PiscinesComponent, EditComponent, PopupComponent]
})
export class PiscinesModule { }
