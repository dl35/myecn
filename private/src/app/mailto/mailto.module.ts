import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailtoComponent } from './mailto.component';
import { MaterialModule } from '../material/material.module';
import { QuillModule } from 'ngx-quill';
import { DiagComponent } from './diag/diag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    QuillModule
  ],
  declarations: [MailtoComponent, DiagComponent],
  entryComponents: [
    DiagComponent
],
})
export class MailtoModule { }

