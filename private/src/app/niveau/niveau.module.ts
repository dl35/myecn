import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { NiveauComponent } from './niveau.component';
import { NiveauRoutingModule } from './niveau-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NiveauRoutingModule
  ],
  declarations: [NiveauComponent, EditComponent],
  providers: [],
})
export class NiveauModule { }
