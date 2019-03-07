import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompetitionsComponent, SearchFilterPipe } from './competitions.component';
import { CompetitionsEditComponent } from './competitions-edit/competitions-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SearchFilterPipe

  ],
  declarations: [CompetitionsComponent, CompetitionsEditComponent, SearchFilterPipe]
  // exports: [SearchFilterPipe]
})
export class CompetitionsModule { }
