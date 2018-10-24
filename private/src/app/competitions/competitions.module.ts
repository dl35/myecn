import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompetitionsComponent } from './competitions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { CompetitionsRoutingModule } from './competitions-routing.modules';
import { CompetitionsEditComponent } from './competitions-edit/competitions-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    CompetitionsRoutingModule
  ],
  declarations: [CompetitionsComponent, CompetitionsEditComponent],
  exports: [CompetitionsComponent]
})
export class CompetitionsModule { }
