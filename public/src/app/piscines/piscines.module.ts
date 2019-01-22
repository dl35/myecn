import { PiscinesComponent } from './piscines.component';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [PiscinesComponent]
})
export class PiscinesModule { }
