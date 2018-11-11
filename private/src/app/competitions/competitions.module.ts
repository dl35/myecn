import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompetitionsComponent } from './competitions.component';
import { CompetitionsEditComponent } from './competitions-edit/competitions-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule

  ],
  declarations: [CompetitionsComponent, CompetitionsEditComponent],
 // exports: [CompetitionsComponent]
})
export class CompetitionsModule { }
